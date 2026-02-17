SET search_path TO btg_model;

SELECT DISTINCT c.nombre, c.apellidos
FROM cliente c
JOIN inscripcion i ON c.idCliente = i.idCliente
JOIN producto p ON p.idProducto = i.idProducto
WHERE NOT EXISTS (
    SELECT 1
    FROM disponibilidad d
    WHERE d.idProducto = p.idProducto
    AND d.idSucursal NOT IN (
        SELECT v.idSucursal
        FROM visitan v
        WHERE v.idCliente = c.idCliente
    )
);

