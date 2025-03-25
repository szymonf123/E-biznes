package controllers
import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import models.Product

object Product {
  implicit val productFormat: Format[Product] = Json.format[Product]
}

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private var products = List(
    new Product("Laptop", 3000.00),
    new Product("Smartphone", 1500.00),
    new Product("Tablet", 1200.00)
  )

  def index: Action[AnyContent] = Action {
    Ok(views.html.index(products))
  }
}