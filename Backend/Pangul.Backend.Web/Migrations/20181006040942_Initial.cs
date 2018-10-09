using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pangul.Backend.Web.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnswerGlobalMeta",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    AnswerGlobalMetaId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Votes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerGlobalMeta", x => x.AnswerGlobalMetaId);
                });

            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    LoginId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.LoginId);
                });

            migrationBuilder.CreateTable(
                name: "QuestionGlobalMeta",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    QuestionGlobalMetaId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Votes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionGlobalMeta", x => x.QuestionGlobalMetaId);
                });

            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    TopicId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Icon = table.Column<byte[]>(nullable: true),
                    IconType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.TopicId);
                });

            migrationBuilder.CreateTable(
                name: "UserContacts",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    UserContactId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserContacts", x => x.UserContactId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    UserId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LoginId = table.Column<long>(nullable: true),
                    UserContactId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Logins_LoginId",
                        column: x => x.LoginId,
                        principalTable: "Logins",
                        principalColumn: "LoginId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_UserContacts_UserContactId",
                        column: x => x.UserContactId,
                        principalTable: "UserContacts",
                        principalColumn: "UserContactId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    QuestionId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TopicId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    QuestionGlobalMetaId = table.Column<long>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Question_QuestionGlobalMeta_QuestionGlobalMetaId",
                        column: x => x.QuestionGlobalMetaId,
                        principalTable: "QuestionGlobalMeta",
                        principalColumn: "QuestionGlobalMetaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Question_Topic_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topic",
                        principalColumn: "TopicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Question_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    AnswerId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    QuestionId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    AnswerGlobalMetaId = table.Column<long>(nullable: false),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_Answer_AnswerGlobalMeta_AnswerGlobalMetaId",
                        column: x => x.AnswerGlobalMetaId,
                        principalTable: "AnswerGlobalMeta",
                        principalColumn: "AnswerGlobalMetaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answer_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionMeta",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    QuestionMetaId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<long>(nullable: false),
                    QuestionId = table.Column<long>(nullable: false),
                    Votes = table.Column<int>(nullable: false),
                    Star = table.Column<bool>(nullable: false),
                    QuestionId1 = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionMeta", x => x.QuestionMetaId);
                    table.ForeignKey(
                        name: "FK_QuestionMeta_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionMeta_Question_QuestionId1",
                        column: x => x.QuestionId1,
                        principalTable: "Question",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuestionMeta_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTag",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    QuestionTagId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    QuestionId = table.Column<long>(nullable: false),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTag", x => x.QuestionTagId);
                    table.ForeignKey(
                        name: "FK_QuestionTag_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnswerMeta",
                columns: table => new
                {
                    RowVersion = table.Column<byte[]>(nullable: true),
                    AnswerMetaId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AnswerId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    Votes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerMeta", x => x.AnswerMetaId);
                    table.ForeignKey(
                        name: "FK_AnswerMeta_Answer_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answer",
                        principalColumn: "AnswerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerMeta_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_AnswerGlobalMetaId",
                table: "Answer",
                column: "AnswerGlobalMetaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_UserId",
                table: "Answer",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerMeta_AnswerId",
                table: "AnswerMeta",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerMeta_UserId",
                table: "AnswerMeta",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Question_QuestionGlobalMetaId",
                table: "Question",
                column: "QuestionGlobalMetaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Question_TopicId",
                table: "Question",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Question_UserId",
                table: "Question",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionMeta_QuestionId",
                table: "QuestionMeta",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionMeta_QuestionId1",
                table: "QuestionMeta",
                column: "QuestionId1");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionMeta_UserId",
                table: "QuestionMeta",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTag_QuestionId",
                table: "QuestionTag",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Topic_Name",
                table: "Topic",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoginId",
                table: "Users",
                column: "LoginId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserContactId",
                table: "Users",
                column: "UserContactId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerMeta");

            migrationBuilder.DropTable(
                name: "QuestionMeta");

            migrationBuilder.DropTable(
                name: "QuestionTag");

            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "AnswerGlobalMeta");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "QuestionGlobalMeta");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.DropTable(
                name: "UserContacts");
        }
    }
}
