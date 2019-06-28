using Microsoft.EntityFrameworkCore.Migrations;

namespace JinJiWeb.Migrations
{
    public partial class N_C_Order_Sum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Sum",
                table: "Order",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sum",
                table: "Order");
        }
    }
}
