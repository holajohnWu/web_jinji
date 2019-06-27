using System;
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
    public class ProductController : ControllerBase {

        private readonly AppDbContext _dbContext;

        public ProductController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // GET: api/Product
        [HttpGet]
        public ActionResult<List<Product>> GetAll() {
            return _dbContext.Products.ToList();
        }

        // POST: api/Product
        [HttpPost]
        public ActionResult<Product> Post([FromBody] Product model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState.ToString());
            }

            _dbContext.Products.Add(model);
            _dbContext.SaveChanges();

            return model;
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public ActionResult<Product> Put(int id, [FromBody] Product model) {
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

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            if (!_dbContext.Products.Any(p => p.Id == id)) {
                return NotFound();
            }

            var product = _dbContext.Products.Single(p => p.Id == id);

            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}