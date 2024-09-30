SELECT
    l.id AS livro_id,
    l.titulo,
    l.autor,
    l.qtpaginas,
    l.emprestado,
    c.id AS categoria_id,
    c.name AS categoria_name
FROM
    livros l
LEFT JOIN
    livros_has_categorias lc ON l.id = lc.livros_id
LEFT JOIN
    categorias c ON lc.categorias_id = c.id;
