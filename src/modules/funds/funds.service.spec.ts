import { Test, TestingModule } from '@nestjs/testing';
import { FundsService } from './funds.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('FundsService', () => {
  let service: FundsService;

  const mockUsersService = {
    findById: jest.fn(),
  };

  const mockTransactionModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockFundModel = {
    findById: jest.fn(),
  };

  const mockNotificationService = {
    notify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FundsService,
        {
          provide: getModelToken('Fund'),
          useValue: mockFundModel,
        },
        {
          provide: getModelToken('Transaction'),
          useValue: mockTransactionModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: NotificationsService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    service = module.get<FundsService>(FundsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe successfully', async () => {
    const user = {
      _id: 'user123',
      email: 'test@test.com',
      balance: 500000,
      save: jest.fn(),
    };

    const fund = {
      _id: 'fund123',
      name: 'FDO-ACCIONES',
      minimumAmount: 250000,
    };

    mockUsersService.findById.mockResolvedValue(user);
    mockFundModel.findById.mockResolvedValue(fund);
    mockTransactionModel.findOne.mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });

    const result = await service.subscribe(user._id, fund._id);

    expect(result.message).toBe('Subscribed successfully');
    expect(user.balance).toBe(250000);
    expect(mockTransactionModel.create).toHaveBeenCalled();
    expect(mockNotificationService.notify).toHaveBeenCalled();
  });

  it('should throw error when balance is insufficient', async () => {
    const user = {
      _id: 'user123',
      email: 'test@test.com',
      balance: 1000,
      save: jest.fn(),
    };

    const fund = {
      _id: 'fund123',
      name: 'FDO-ACCIONES',
      minimumAmount: 250000,
    };

    mockUsersService.findById.mockResolvedValue(user);
    mockFundModel.findById.mockResolvedValue(fund);
    mockTransactionModel.findOne.mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });

    await expect(service.subscribe(user._id, fund._id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should prevent double subscription', async () => {
    const user = {
      _id: 'user123',
      email: 'test@test.com',
      balance: 500000,
      save: jest.fn(),
    };

    const fund = {
      _id: 'fund123',
      name: 'FDO-ACCIONES',
      minimumAmount: 250000,
    };

    mockUsersService.findById.mockResolvedValue(user);
    mockFundModel.findById.mockResolvedValue(fund);
    mockTransactionModel.findOne.mockReturnValue({
      sort: jest.fn().mockResolvedValue({
        type: 'SUBSCRIBE',
      }),
    });

    await expect(service.subscribe(user._id, fund._id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should restore balance when cancelling', async () => {
    const user = {
      _id: 'user123',
      email: 'test@test.com',
      balance: 500000,
      save: jest.fn(),
    };

    const fund = {
      _id: 'fund123',
      name: 'FDO-ACCIONES',
      minimumAmount: 250000,
    };

    mockUsersService.findById.mockResolvedValue(user);
    mockFundModel.findById.mockResolvedValue(fund);

    const result = await service.cancel(user._id, fund._id);

    expect(user.balance).toBe(750000);
    expect(mockTransactionModel.create).toHaveBeenCalled();
    expect(result.message).toBe('Subscription cancelled successfully');
  });
});
