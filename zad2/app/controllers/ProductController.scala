package controllers

import javax.inject._
import play.api.mvc._
import models.Product
import scala.collection.mutable.ListBuffer

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val products = ListBuffer(
    Product("Laptop", 3000.00),
    Product("Smartphone", 1500.00),
    Product("Tablet", 1200.00)
  )

  def showAll: Action[AnyContent] = Action {
    Ok(views.html.index("Lista produktów", products.toList))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    products.lift(id) match {
      case Some(product) => Ok(views.html.index(s"Produkt o ID $id", List(product)))
      case None => NotFound(s"Produkt o ID $id nie istnieje.")
    }
  }

  def add(name: String, price: Double): Action[AnyContent] = Action {
    products += Product(name, price)
    Ok(views.html.index(s"Dodano nowy produkt - $name", products.toList))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    products.lift(id) match {
      case None => NotFound(s"Produkt o ID $id nie istnieje.")
      case Some(product) =>
        val droppedProductName = product.name
        products.remove(id)
        Ok(views.html.index(s"Usunięto produkt - $droppedProductName", products.toList))
    }
  }

  def update(id: Int, name: String, price: Double): Action[AnyContent] = Action {
    products.lift(id) match {
      case None => NotFound(s"Produkt o ID $id nie istnieje.")
      case Some(_) =>
        products(id) = Product(name, price)
        Ok(views.html.index(s"Zmodyfikowano produkt o ID $id", products.toList))
    }
  }
}
