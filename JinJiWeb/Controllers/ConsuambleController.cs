using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JinJiWeb.Data;
using JinJiWeb.Models;
using JinJiWeb.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JinJiWeb.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ConsumableController : ControllerBase {

        private readonly AppDbContext _dbContext;

        public ConsumableController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // GET: api/Order
        [HttpGet]
        public ActionResult<List<Consumable>> Get(int year, int month, int day) {
            return _dbContext.Consumables
                .Where(o => (year.Equals(0) || year.Equals(o.Year))
                && (month.Equals(0) || month.Equals(o.Month))
                && (day.Equals(0) || day.Equals(o.Day))).ToList();
        }

        // POST: api/Consumable
        [HttpPost]
        public ActionResult<Consumable> Post([FromBody] Consumable model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState.ToString());
            }

            _dbContext.Consumables.Add(model);
            _dbContext.SaveChanges();

            return model;
        }

        // PUT: api/Consumable/5
        [HttpPut("{id}")]
        public ActionResult<Consumable> Put(int id, [FromBody] Consumable model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState.ToString());
            }

            if (!_dbContext.Products.Any(p => p.Id == id)) {
                return NotFound();
            }

            _dbContext.Entry(model).State = EntityState.Modified;
            _dbContext.SaveChanges();

            return model;
        }

        // DELETE: api/Consumable/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            if (!_dbContext.Products.Any(p => p.Id == id)) {
                return NotFound();
            }

            var product = _dbContext.Consumables.Single(p => p.Id == id);

            _dbContext.Consumables.Remove(product);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
