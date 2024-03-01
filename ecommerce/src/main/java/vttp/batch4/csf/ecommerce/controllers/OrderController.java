package vttp.batch4.csf.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp.batch4.csf.ecommerce.UpdatingException;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> postOrder(@RequestBody Order order) {

    // TODO Task 3
    System.out.println("REACHED BACKEND TO POST ORDER>>>>" + order);

    // ORDER>>>>Order{orderId=01HQW6AKRBKCYWYJ5TXWZBZG02, date=Fri Mar 01 13:03:25
    // SGT 2024, name=cfvsd, address=1, priority=true, comments=vfdsvfds,
    // cart=Cart{lineItems=[LineItem{productId=null, name=Cheese Slices - Made From
    // Cow Milk 663 g + Cheese Spread - Cream Cheese 100 g, quantity=1,
    // price=710.000}]}}

    try {
      poSvc.createNewPurchaseOrder(order);

      String send = order.getOrderId();

      JsonObject resp = Json.createObjectBuilder()
          .add("orderId", send)
          .add("status", 200)
          .build();

      // 200 -> then() in frontend form component processForm()
      return ResponseEntity.ok(resp.toString());
    } catch (UpdatingException e) {
      JsonObject err = Json.createObjectBuilder()
          .add("message", "error creating PO")
          .add("status", 400)
          .build();

      // 400 -> catch() in frontend form component processForm()
      return ResponseEntity.status(400).body(err.toString());
    }

  }
}
