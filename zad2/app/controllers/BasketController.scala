package controllers

import javax.inject._
import play.api.mvc._
import models.Basket
import scala.collection.mutable.ListBuffer

@Singleton
class BasketController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val baskets = ListBuffer(
    Basket(0, 0, 3),
    Basket(1, 1, 1),
    Basket(1, 0, 2),
    Basket(2, 0, 1)
  )

  def showAll: Action[AnyContent] = Action {
    Ok(views.html.baskets("Lista wszystkich koszyków", baskets.toList))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    baskets.lift(id) match {
      case Some(basket) =>
        Ok(views.html.baskets(s"Koszyk o ID $id", List(basket)))
      case None =>
        NotFound(s"Koszyk o ID $id nie istnieje.")
    }
  }

  def add(userID: Int, productID: Int, number: Int): Action[AnyContent] = Action {
    baskets += Basket(userID, productID, number)
    Ok(views.html.baskets("Dodano nowy koszyk", baskets.toList))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    baskets.lift(id) match {
      case None =>
        NotFound(s"Koszyk o ID $id nie istnieje.")
      case Some(_) =>
        baskets.remove(id)
        Ok(views.html.baskets(s"Usunięto koszyk o ID = $id", baskets.toList))
    }
  }

  def update(id: Int, userID: Int, productID: Int, number: Int): Action[AnyContent] = Action {
    baskets.lift(id) match {
      case None =>
        NotFound(s"Koszyk o ID $id nie istnieje.")
      case Some(_) =>
        baskets(id) = Basket(userID, productID, number)
        Ok(views.html.baskets(s"Zmodyfikowano koszyk o ID $id", baskets.toList))
    }
  }
}
