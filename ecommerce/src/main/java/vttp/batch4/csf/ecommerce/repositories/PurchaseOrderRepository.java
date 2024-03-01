package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.UpdatingException;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  public static final String INSERT_NEW_ORDER = """
      insert into orders(orderId, date, name, address, priority, comments)
      values (?,?,?,?,?,?)
      	""";

  public static final String INSERT_INTO_CART = """
      insert into cart(productId, orderId, name, quantity, price)
      values (?,?,?,?,?)
        """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional (rollbackFor = UpdatingException.class)
  public void create(Order order) throws UpdatingException {
    // TODO Task 3

    if(template.update(INSERT_NEW_ORDER, order.getOrderId(), order.getDate(), order.getName(), 
      order.getAddress(), order.getPriority(), order.getComments()) == 0){
        throw new UpdatingException("cannot update order");
      };

      Cart c = new Cart();

    c = order.getCart();
    
    List<LineItem> cart = c.getLineItems();
    System.out.println("CART LOOKS LIKE THIS>>>>" + cart );

    for (LineItem i : cart){
      System.out.println("PRODUCT ID LOOKS LIKE THAT " + i.getProdId());
      if(template.update(INSERT_INTO_CART, i.getProdId(), order.getOrderId(), i.getName(), i.getQuantity(), i.getPrice())==0){
        throw new UpdatingException("cannot update order");
      };
    }

  }
}
