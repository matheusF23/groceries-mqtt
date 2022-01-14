const CategoryService = require('./services/CategoryService')
const ProductService = require('./services/ProductService')
const OrderService = require('./services/OrderService')

const app = (message) => {
  const listParams = message.split('-|-')

  switch (listParams[0]) {
    case 'listCategories':
      const categories = JSON.stringify(CategoryService.listCategories())
      return `listAndChooseCategories-|-${categories}`
    case 'chosenCategory':
      const category = listParams[1]
      const products = JSON.stringify(ProductService.getProductsByCategory(category))
      return `listAndChooseProduct-|-${products}`
    case 'chosenProduct':
      const { productId, productQuantity } = JSON.parse(listParams[1])
      OrderService.addProduct(productId, productQuantity)
      return 'addAnotherProduct'
    case 'getOrder':
      const order = JSON.stringify(OrderService.getOrder())
      return `showOrder-|-${order}`
    case 'deleteProduct':
      const newOrder = JSON.stringify(OrderService.deleteProduct(listParams[1]))
      return `showOrder-|-${newOrder}`
    case 'closeOrder':
      const closeOrder = listParams[1]
      if (closeOrder === '2') return 'addAnotherProduct'
      if (closeOrder === '1') {
        OrderService.clearOrder()
        return 'orderClosed'
      }
    default:
      return "ERROR-|-Comando não reconhecido\n"
  }
}

module.exports = app