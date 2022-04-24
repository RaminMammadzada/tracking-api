import  Visitor  from './models/visitor'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Visitor.sync({ alter: isDev })
}
export default dbInit 