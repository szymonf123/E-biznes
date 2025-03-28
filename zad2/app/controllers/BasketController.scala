package controllers
import javax.inject._
import play.api.mvc._
import models.Basket

@Singleton
class BasketController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private var baskets = List(
    Basket(0, 0, 3),
    Basket(1, 1, 1),
    Basket(1, 0, 2),
    Basket(2, 0, 1)
  )

  def showAll: Action[AnyContent] = Action {
    Ok(views.html.baskets("Lista wszystkich koszyków", baskets))
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
    baskets = baskets :+ Basket(userID, productID, number)
    Ok(views.html.baskets("Dodano nowy koszyk", baskets))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    baskets.lift(id) match {
      case None =>
        NotFound(s"Koszyk o ID $id nie istnieje.")
      case Some(basket) =>
        baskets = baskets.patch(id, Nil, 1)
        Ok(views.html.baskets(s"Usunięto koszyk o ID = $id", baskets))
    }
  }

  def update(id: Int, userID: Int, productID: Int, number: Int): Action[AnyContent] = Action {
    baskets.lift(id) match {
      case None =>
        NotFound(s"Koszyk o ID $id nie istnieje.")
      case Some(basket) =>
        val updatedBasket= basket.copy(userID = userID, productID = productID, number = number)
        baskets = baskets.updated(id, updatedBasket)
        Ok(views.html.baskets(s"Zmodyfikowano koszyk o ID $id", baskets))
    }
  }
}