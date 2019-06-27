using System.Collections.Generic;
using System.Linq;
using JinJiWeb.Data;
using JinJiWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JinJiWeb.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class OrderController : ControllerBase {

        private readonly AppDbContext _dbContext;

        public OrderController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // GET: api/Order
        [HttpGet]
        public ActionResult<List<Order>> Get(int year, int month, int day) {
            return _dbContext.Orders
                .Include(o => o.OrderDetails)
                .Where(o => (year.Equals(0) || year.Equals(o.Year))
                && (month.Equals(0) || month.Equals(o.Month))
                && (day.Equals(0) || day.Equals(o.Day))).ToList();
        }

        // POST: api/Order
        [HttpPost]
        public ActionResult<Order> Post([FromBody] Order model) {

            if (!ModelState.IsValid) {
                return BadRequest(ModelState.ToString());
            }

            if (!model.OrderDetails.Any()) {
                return BadRequest();
            }

            foreach (var o in model.OrderDetails) {
                o.OrderId = model.Id;
            }

            _dbContext.Orders.Add(model);
            _dbContext.SaveChanges();

            return model;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id) {
            var order = _dbContext.Orders.Find(id);

            if (order == null) {
                return NotFound();
            }

            var orderDetails = _dbContext.OrderDetails.Where(o => o.OrderId == id);

            if (orderDetails.Count() > 0) {
                _dbContext.OrderDetails.RemoveRange(orderDetails);
            }

            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();

            return true;
        }
    }
}
