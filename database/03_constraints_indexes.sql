SET search_path TO btg_model;

CREATE INDEX idx_inscripcion_cliente ON inscripcion(idCliente);
CREATE INDEX idx_disponibilidad_producto ON disponibilidad(idProducto);
CREATE INDEX idx_visitan_cliente ON visitan(idCliente);

ALTER TABLE producto
ADD CONSTRAINT chk_tipo_producto
CHECK (tipoProducto <> '');
