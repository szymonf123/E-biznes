package controllers

import javax.inject._
import play.api.mvc._
import models.Category
import scala.collection.mutable.ListBuffer

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val categories = ListBuffer(
    Category("Elektronika"),
    Category("Akcesoria"),
    Category("Rekreacja")
  )

  def showAll: Action[AnyContent] = Action {
    Ok(views.html.categories("Lista kategorii", categories.toList))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    categories.lift(id) match {
      case Some(category) =>
        Ok(views.html.categories(s"Kategoria o ID $id", List(category)))
      case None =>
        NotFound(s"Kategoria o ID $id nie istnieje.")
    }
  }

  def add(name: String): Action[AnyContent] = Action {
    categories += Category(name)
    Ok(views.html.categories(s"Dodano nową kategorię - $name", categories.toList))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    categories.lift(id) match {
      case None =>
        NotFound(s"Kategoria o ID $id nie istnieje.")
      case Some(_) =>
        categories.remove(id)
        Ok(views.html.categories(s"Usunięto kategorię o ID $id", categories.toList))
    }
  }

  def update(id: Int, name: String): Action[AnyContent] = Action {
    categories.lift(id) match {
      case None =>
        NotFound(s"Kategoria o ID $id nie istnieje.")
      case Some(_) =>
        categories(id) = Category(name)
        Ok(views.html.categories(s"Zmodyfikowano kategorię o ID $id", categories.toList))
    }
  }
}
