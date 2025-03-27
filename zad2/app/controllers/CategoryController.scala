package controllers
import javax.inject._
import play.api.mvc._
import models.Category

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private var categories = List(
    Category("Elektronika"),
    Category("Akcesoria"),
    Category("Rekreacja")
  )

  def showAll: Action[AnyContent] = Action {
    Ok(views.html.categories("Lista kategorii", categories))
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
    categories = categories :+ Category(name)
    Ok(views.html.categories(s"Dodano nową kategorię - $name", categories))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    categories.lift(id) match {
      case None =>
        NotFound(s"Kategoria o ID $id nie istnieje.")
      case Some(category) =>
        val droppedCategoryName = category.name
        categories = categories.patch(id, Nil, 1)
        Ok(views.html.categories(s"Usunięto kategorię - $droppedCategoryName", categories))
    }
  }

  def update(id: Int, name: String): Action[AnyContent] = Action {
    categories.lift(id) match {
      case None =>
        NotFound(s"Kategoria o ID $id nie istnieje.")
      case Some(category) =>
        val updatedCategory = category.copy(name = name)
        categories = categories.updated(id, updatedCategory)
        Ok(views.html.categories(s"Zmodyfikowano kategorię o ID $id", categories))
    }
  }
}