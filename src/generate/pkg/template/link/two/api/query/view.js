import { SqlBuilder } from '@scola/doc'

export function buildView () {
  const sb = new SqlBuilder({
    type: 'object'
  })

  sb.build(
    sb.query(
      sb.select('*'),
      sb.from(
        sb.id('/*table*/')
      ),
      sb.left(),
      sb.join(
        sb.id('/*link*/')
      ),
      sb.on(
        sb.eq(
          sb.id('/*table*/./*link*/_id'),
          sb.id('/*link*/./*link*/_id')
        )
      ),
      sb.where(
        sb.and(
          sb.eq(
            sb.id('/*table*/./*object*/_id'),
            sb.value((request) => {
              return request.params['/*object*/_id']
            })
          ),
          sb.eq(
            sb.id('/*table*/./*link*/_id'),
            sb.value((request) => {
              return request.params['/*link*/_id']
            })
          )
        )
      )
    )
  )

  return sb
}