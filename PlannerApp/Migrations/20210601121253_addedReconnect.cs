using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlannerApp.Migrations
{
    public partial class addedReconnect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FailedAttempts",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "RecconnectTime",
                table: "Employees",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FailedAttempts",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "RecconnectTime",
                table: "Employees");
        }
    }
}
