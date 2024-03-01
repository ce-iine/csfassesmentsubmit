package vttp.batch4.csf.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.batch4.csf.ecommerce.UpdatingException;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.repositories.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {

  @Autowired
  private PurchaseOrderRepository poRepo;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void createNewPurchaseOrder(Order order) throws UpdatingException {
    // TODO Task 3
    poRepo.create(order);
  }
}
