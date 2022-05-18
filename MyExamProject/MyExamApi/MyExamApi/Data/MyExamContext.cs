using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MyExamApi.Models;

namespace MyExamApi.Data
{
    public partial class MyExamContext : DbContext
    {
        public MyExamContext()
        {
        }

        public MyExamContext(DbContextOptions<MyExamContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answer> Answers { get; set; } = null!;
        public virtual DbSet<Attempt> Attempts { get; set; } = null!;
        public virtual DbSet<Exam> Exams { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Grade> Grades { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UsersAnswer> UsersAnswers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("name=mydb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.24-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.ToTable("answers");

                entity.HasIndex(e => e.QuestionId, "fk_answers_question1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Correct)
                    .HasColumnType("tinyint(4)")
                    .HasColumnName("correct")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Hide)
                    .HasColumnType("tinyint(4)")
                    .HasColumnName("hide")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.QuestionId)
                    .HasColumnType("int(11)")
                    .HasColumnName("question_id");

                entity.Property(e => e.Title)
                    .HasMaxLength(45)
                    .HasColumnName("title");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_answers_question1");
            });

            modelBuilder.Entity<Attempt>(entity =>
            {
                entity.ToTable("attempts");

                entity.HasIndex(e => e.ExamId, "fk_attempts_exam1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.ExamId)
                    .HasColumnType("int(11)")
                    .HasColumnName("exam_id");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.Attempts)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_attempts_exam1");
            });

            modelBuilder.Entity<Exam>(entity =>
            {
                entity.ToTable("exam");

                entity.HasIndex(e => e.UsersId, "fk_exam_users1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .HasMaxLength(45)
                    .HasColumnName("description");

                entity.Property(e => e.ExamsTime)
                    .HasColumnType("int(11)")
                    .HasColumnName("examsTime");

                entity.Property(e => e.Hide)
                    .HasColumnType("tinyint(4)")
                    .HasColumnName("hide");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.Property(e => e.UsersId)
                    .HasColumnType("int(11)")
                    .HasColumnName("users_id");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.Exams)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_exam_users1");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedback");

                entity.HasIndex(e => e.ExamId, "fk_feedback_exam1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.ExamId)
                    .HasColumnType("int(11)")
                    .HasColumnName("exam_id");

                entity.Property(e => e.Vote)
                    .HasColumnType("int(11)")
                    .HasColumnName("vote");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_feedback_exam1");
            });

            modelBuilder.Entity<Grade>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.UsersId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("grades");

                entity.HasIndex(e => e.UsersId, "fk_Assesments_has_users_users1_idx");

                entity.HasIndex(e => e.ExamId, "fk_grades_exam1_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.UsersId)
                    .HasColumnType("int(11)")
                    .HasColumnName("users_id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.ExamId)
                    .HasColumnType("int(11)")
                    .HasColumnName("exam_id");

                entity.Property(e => e.Grade1).HasColumnName("grade");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.Grades)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_grades_exam1");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.Grades)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Assesments_has_users_users1");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("question");

                entity.HasIndex(e => e.ExamId, "fk_question_exam1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Difficulty)
                    .HasColumnType("enum('1','2','3','4','5')")
                    .HasColumnName("difficulty");

                entity.Property(e => e.ExamId)
                    .HasColumnType("int(11)")
                    .HasColumnName("exam_id");

                entity.Property(e => e.Hide)
                    .HasColumnType("tinyint(4)")
                    .HasColumnName("hide");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.Title)
                    .HasMaxLength(45)
                    .HasColumnName("title");

                entity.Property(e => e.Type)
                    .HasColumnType("enum('radio','checkbox')")
                    .HasColumnName("type");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_question_exam1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(45)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(45)
                    .HasColumnName("last_name");

                entity.Property(e => e.Password)
                    .HasMaxLength(256)
                    .HasColumnName("password");

                entity.Property(e => e.Type)
                    .HasMaxLength(45)
                    .HasColumnName("type");
            });

            modelBuilder.Entity<UsersAnswer>(entity =>
            {
                entity.ToTable("users_answers");

                entity.HasIndex(e => e.AnswersId, "fk_users_answers_answers1_idx");

                entity.HasIndex(e => e.AttemptsId, "fk_users_answers_attempts1_idx");

                entity.HasIndex(e => e.UsersId, "fk_users_answers_users1_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AnswersId)
                    .HasColumnType("int(11)")
                    .HasColumnName("answers_id");

                entity.Property(e => e.AttemptsId)
                    .HasColumnType("int(11)")
                    .HasColumnName("attempts_id");

                entity.Property(e => e.Point).HasColumnName("point");

                entity.Property(e => e.UsersId)
                    .HasColumnType("int(11)")
                    .HasColumnName("users_id");

                entity.HasOne(d => d.Answers)
                    .WithMany(p => p.UsersAnswers)
                    .HasForeignKey(d => d.AnswersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_users_answers_answers1");

                entity.HasOne(d => d.Attempts)
                    .WithMany(p => p.UsersAnswers)
                    .HasForeignKey(d => d.AttemptsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_users_answers_attempts1");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.UsersAnswers)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_users_answers_users1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
