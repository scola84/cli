export function table(s) {
  s.build(
    s.query(
      s.select(
        s.as(
          'TABLES.TABLE_NAME',
          'name'
        )
      ),
      s.from('information_schema.TABLES'),
      s.where(
        s.like(
          'TABLES.TABLE_NAME',
          s.value((box) => `%${box.object}%`)
        )
      )
    )
  );
}
