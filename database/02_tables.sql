SET search_path TO btg_model;

CREATE TABLE cliente (
    idCliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE producto (
    idProducto SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipoProducto VARCHAR(100) NOT NULL
);

CREATE TABLE sucursal (
    idSucursal SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE inscripcion (
    idProducto INT NOT NULL,
    idCliente INT NOT NULL,

    PRIMARY KEY (idProducto, idCliente),

    FOREIGN KEY (idProducto)
        REFERENCES producto(idProducto)
        ON DELETE CASCADE,

    FOREIGN KEY (idCliente)
        REFERENCES cliente(idCliente)
        ON DELETE CASCADE
);

CREATE TABLE disponibilidad (
    idSucursal INT NOT NULL,
    idProducto INT NOT NULL,

    PRIMARY KEY (idSucursal, idProducto),

    FOREIGN KEY (idSucursal)
        REFERENCES sucursal(idSucursal)
        ON DELETE CASCADE,

    FOREIGN KEY (idProducto)
        REFERENCES producto(idProducto)
        ON DELETE CASCADE
);

CREATE TABLE visitan (
    idSucursal INT NOT NULL,
    idCliente INT NOT NULL,
    fechaVisita DATE NOT NULL,

    PRIMARY KEY (idSucursal, idCliente),

    FOREIGN KEY (idSucursal)
        REFERENCES sucursal(idSucursal)
        ON DELETE CASCADE,

    FOREIGN KEY (idCliente)
        REFERENCES cliente(idCliente)
        ON DELETE CASCADE
);
