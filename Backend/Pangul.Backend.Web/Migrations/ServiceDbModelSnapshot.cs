﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pangul.Backend.Web.Core;

namespace Pangul.Backend.Web.Migrations
{
    [DbContext(typeof(ServiceDb))]
    partial class ServiceDbModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846");

            modelBuilder.Entity("Pangul.Core.Data.Questions.Answer", b =>
                {
                    b.Property<long>("AnswerId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("AnswerGlobalMetaId");

                    b.Property<string>("Body");

                    b.Property<long>("QuestionId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<long>("UserId");

                    b.HasKey("AnswerId");

                    b.HasIndex("AnswerGlobalMetaId")
                        .IsUnique();

                    b.HasIndex("QuestionId");

                    b.HasIndex("UserId");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.AnswerGlobalMeta", b =>
                {
                    b.Property<long>("AnswerGlobalMetaId")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<int>("Votes");

                    b.HasKey("AnswerGlobalMetaId");

                    b.ToTable("AnswerGlobalMeta");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.AnswerMeta", b =>
                {
                    b.Property<long>("AnswerMetaId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("AnswerId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<long>("UserId");

                    b.Property<int>("Votes");

                    b.HasKey("AnswerMetaId");

                    b.HasIndex("AnswerId");

                    b.HasIndex("UserId");

                    b.ToTable("AnswerMeta");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.Question", b =>
                {
                    b.Property<long>("QuestionId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<long>("QuestionGlobalMetaId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<DateTimeOffset>("TimeCreated");

                    b.Property<string>("Title");

                    b.Property<long>("TopicId");

                    b.Property<long>("UserId");

                    b.HasKey("QuestionId");

                    b.HasIndex("QuestionGlobalMetaId")
                        .IsUnique();

                    b.HasIndex("TopicId");

                    b.HasIndex("UserId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.QuestionGlobalMeta", b =>
                {
                    b.Property<long>("QuestionGlobalMetaId")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<int>("Votes");

                    b.HasKey("QuestionGlobalMetaId");

                    b.ToTable("QuestionGlobalMeta");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.QuestionMeta", b =>
                {
                    b.Property<long>("QuestionMetaId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("QuestionId");

                    b.Property<long?>("QuestionId1");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<bool>("Star");

                    b.Property<long>("UserId");

                    b.Property<int>("Votes");

                    b.HasKey("QuestionMetaId");

                    b.HasIndex("QuestionId");

                    b.HasIndex("QuestionId1");

                    b.HasIndex("UserId");

                    b.ToTable("QuestionMeta");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.QuestionTag", b =>
                {
                    b.Property<long>("QuestionTagId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("QuestionId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<string>("Tag");

                    b.HasKey("QuestionTagId");

                    b.HasIndex("QuestionId");

                    b.ToTable("QuestionTag");
                });

            modelBuilder.Entity("Pangul.Core.Data.Topics.Topic", b =>
                {
                    b.Property<long>("TopicId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<byte[]>("Icon");

                    b.Property<string>("IconType");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<DateTimeOffset>("TimeCreated");

                    b.HasKey("TopicId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Topic");
                });

            modelBuilder.Entity("Pangul.Core.Data.Users.Login", b =>
                {
                    b.Property<long>("LoginId")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<string>("Username");

                    b.HasKey("LoginId");

                    b.ToTable("Logins");
                });

            modelBuilder.Entity("Pangul.Core.Data.Users.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("LoginId");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.Property<long>("UserContactId");

                    b.HasKey("UserId");

                    b.HasIndex("LoginId")
                        .IsUnique();

                    b.HasIndex("UserContactId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Pangul.Core.Data.Users.UserContact", b =>
                {
                    b.Property<long>("UserContactId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<string>("Lastname");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken();

                    b.HasKey("UserContactId");

                    b.ToTable("UserContacts");
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.Answer", b =>
                {
                    b.HasOne("Pangul.Core.Data.Questions.AnswerGlobalMeta", "AnswerGlobalMeta")
                        .WithOne("Answer")
                        .HasForeignKey("Pangul.Core.Data.Questions.Answer", "AnswerGlobalMetaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Questions.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.AnswerMeta", b =>
                {
                    b.HasOne("Pangul.Core.Data.Questions.Answer", "Answer")
                        .WithMany()
                        .HasForeignKey("AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.Question", b =>
                {
                    b.HasOne("Pangul.Core.Data.Questions.QuestionGlobalMeta", "QuestionGlobalMeta")
                        .WithOne("Question")
                        .HasForeignKey("Pangul.Core.Data.Questions.Question", "QuestionGlobalMetaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Topics.Topic", "Topic")
                        .WithMany()
                        .HasForeignKey("TopicId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.QuestionMeta", b =>
                {
                    b.HasOne("Pangul.Core.Data.Questions.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pangul.Core.Data.Questions.Question")
                        .WithMany("Meta")
                        .HasForeignKey("QuestionId1");

                    b.HasOne("Pangul.Core.Data.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pangul.Core.Data.Questions.QuestionTag", b =>
                {
                    b.HasOne("Pangul.Core.Data.Questions.Question", "Question")
                        .WithMany("Tags")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pangul.Core.Data.Users.User", b =>
                {
                    b.HasOne("Pangul.Core.Data.Users.Login", "Login")
                        .WithOne("User")
                        .HasForeignKey("Pangul.Core.Data.Users.User", "LoginId");

                    b.HasOne("Pangul.Core.Data.Users.UserContact", "UserContact")
                        .WithOne("User")
                        .HasForeignKey("Pangul.Core.Data.Users.User", "UserContactId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
