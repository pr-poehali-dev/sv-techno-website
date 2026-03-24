"""Отправка заявки на КП с сайта СВ-ТехноГрупп на почту менеджера"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    company = body.get("company", "")
    name = body.get("name", "")
    phone = body.get("phone", "")
    email = body.get("email", "")
    request_type = body.get("request", "")
    comment = body.get("comment", "")

    request_labels = {
        "batteries": "Аккумуляторы (собственное производство)",
        "components": "Комплектующие для БПЛА",
        "supply": "Поставки из Китая",
        "tender": "Государственные закупки / тендер",
        "partnership": "Партнёрство",
        "other": "Другое",
    }
    request_label = request_labels.get(request_type, request_type or "Не указано")

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #222; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 30px; border: 1px solid #dde;">
        <h2 style="color: #0a5dbf; margin-top: 0;">📋 Новая заявка на КП — СВ-ТехноГрупп</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 40%;">Компания</td><td style="padding: 8px 0; font-weight: bold;">{company}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Контактное лицо</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Телефон</td><td style="padding: 8px 0; font-weight: bold;">{phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: bold;">{email}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Тип запроса</td><td style="padding: 8px 0;">{request_label}</td></tr>
        </table>
        {"<div style='margin-top:16px;'><b>Комментарий / ТЗ:</b><div style='background:#f8f9fa;padding:12px;border-radius:6px;margin-top:6px;'>" + comment + "</div></div>" if comment else ""}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; margin: 0;">Заявка отправлена с сайта sv-technogroup.ru</p>
      </div>
    </body>
    </html>
    """

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "manager.sv-group33@mail.ru"
    recipient = "manager.sv-group33@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка на КП от {company or name}"
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
