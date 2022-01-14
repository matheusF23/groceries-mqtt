const CategoryService = require('./services/CategoryService')
const ProductService = require('./services/ProductService')
const OrderService = require('./services/OrderService')

const app = (message) => {
  const listParams = message.split('-|-')

  switch (listParams[0]) {
    case 'WELCOME':
      console.log('Seja bem vindo ao mercadinho SD!')
      return 'listCategories'
    case 'listAndChooseCategories':
      const category = CategoryService.listAndChooseCategories(listParams[1])
      return `chosenCategory-|-${category}`
    case 'listAndChooseProduct':
      const userChoice = JSON.stringify(ProductService.listAndChooseProduct(listParams[1]))
      return `chosenProduct-|-${userChoice}`
    case 'addAnotherProduct':
      const userAnswer = ProductService.addAnotherProduct()
      if (userAnswer === '1') {
        return 'listCategories'
      }
      return 'getOrder'
    case 'showOrder':
      OrderService.showOrder(listParams[1])
      const deleteProduct = OrderService.deleteProduct(listParams[1])
      if (deleteProduct) {
        return `deleteProduct-|-${deleteProduct}`
      }
      const closeOrder = OrderService.closeOrder()
      return `closeOrder-|-${closeOrder}`
    case 'orderClosed':
      console.log('\n################################################')
      console.log('# Pedido finalizado com sucesso! Volte Sempre! #')
      console.log('################################################')
      return 'finished'
      break
    case 'ERROR':
      return console.log(listParams[1])
  }
}

module.exports = app
