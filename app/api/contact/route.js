import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "beinghumanadil@gmail.com",
        pass: "ccyh jnxn okno uquw",
      },
    });

    // Send mail
    await transporter.sendMail({
      from: email,
      to: "beinghumanadil@gmail.com",
      subject: `New Contact Form Submission - ${subject}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">📬 New Contact Form Submission</h2>
      <hr style="border: none; border-top: 1px solid #ccc;" />
      <p><strong style="color: #555;">Name:</strong> ${name}</p>
      <p><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
      <p><strong style="color: #555;">Phone:</strong> ${phone}</p>
      <p><strong style="color: #555;">Subject:</strong> ${subject}</p>
      <div style="margin-top: 15px;">
        <p style="margin-bottom: 5px;"><strong style="color: #555;">Message:</strong></p>
        <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px; color: #333; white-space: pre-line;">
          ${message}
        </div>
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
        This message was sent from your website's contact form.
      </p>
    </div>
  `,
    });

    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to send message." }), {
      status: 500,
    });
  }
}
