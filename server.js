
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for messages
// (Note: This clears every time you restart the server)
const submissions = [];

// Routes
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 2rem;">
      <h1>Portfolio Backend is Running</h1>
      <p>Go to <a href="/messages">/messages</a> to view contact form submissions.</p>
    </div>
  `);
});

// Route to view stored messages in the browser
app.get('/messages', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Contact Submissions</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 2rem; background: #f4f4f5; color: #333; }
          h1 { margin-bottom: 1rem; }
          table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
          th, td { padding: 16px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #18181b; color: white; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; }
          tr:last-child td { border-bottom: none; }
          tr:hover { background-color: #f9fafb; }
          .empty { padding: 3rem; text-align: center; color: #666; font-style: italic; background: white; border-radius: 8px; }
          .back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; }
          .back-link:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <a href="/" class="back-link">← Back to Home</a>
        <h1>Received Messages (${submissions.length})</h1>
        ${submissions.length === 0 ? '<div class="empty">No messages received yet. Go to your portfolio contact form and send one!</div>' : `
          <table>
            <thead>
              <tr>
                <th style="width: 200px">Time</th>
                <th style="width: 200px">Name</th>
                <th style="width: 250px">Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              ${submissions.map(sub => `
                <tr>
                  <td style="color: #666; font-size: 0.9rem;">${new Date(sub.timestamp).toLocaleString()}</td>
                  <td style="font-weight: 500;">${sub.name}</td>
                  <td><a href="mailto:${sub.email}" style="color: #2563eb;">${sub.email}</a></td>
                  <td style="line-height: 1.5;">${sub.message}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </body>
    </html>
  `;
  res.send(html);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Save to memory
  const newSubmission = {
    name,
    email,
    message,
    timestamp: new Date()
  };

  submissions.unshift(newSubmission); // Add to top of list

  console.log('\n========================================');
  console.log('📬 NEW CONTACT FORM SUBMISSION RECEIVED');
  console.log('========================================');
  console.log(`👤 Name:    ${name}`);
  console.log(`📧 Email:   ${email}`);
  console.log(`💬 Message: ${message}`);
  console.log('========================================\n');

  // Simulate a short processing delay
  setTimeout(() => {
    res.status(200).json({ 
      success: true, 
      message: 'Server successfully received the message.' 
    });
  }, 1000);
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n✅ BACKEND SERVER RUNNING ON http://localhost:${PORT}`);
  console.log(`   View messages at http://localhost:${PORT}/messages\n`);
});
