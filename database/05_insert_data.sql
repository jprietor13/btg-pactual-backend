SET search_path TO btg_model;

INSERT INTO cliente (nombre, apellidos, ciudad)
VALUES ('FirstName', 'LastName', 'City');

INSERT INTO producto (nombre, tipoProducto)
VALUES ('Producto A', 'Inversion');

INSERT INTO sucursal (nombre, ciudad)
VALUES ('Sucursal Centro', 'Bogota');

INSERT INTO inscripcion VALUES (1, 1);
INSERT INTO disponibilidad VALUES (1, 1);
INSERT INTO visitan VALUES (1, 1, CURRENT_DATE);
--------------------------------------------------------------

--Prueba negativa (no devuelve nada)
INSERT INTO sucursal (nombre, ciudad)
VALUES ('Sucursal Norte', 'Bogota');

INSERT INTO disponibilidad VALUES (2, 1);
