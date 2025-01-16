# GRI Training Referral System

A modern, gamified referral management system built with Next.js 13, featuring real-time leaderboards, interactive animations, and a seamless referral tracking experience.

## Features

- 🎮 Gamified Referral Dashboard
- 📊 Real-time Leaderboard
- 🔗 Unique Referral Link Generation
- ✨ Interactive Animations
- 🌓 Dark/Light Mode Support
- 📱 Fully Responsive Design
- 🔒 Secure Authentication
- 👥 User Role Management (Admin/Employee)

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide Icons
- **Authentication:** Custom Auth with Session Management
- **State Management:** React Hooks
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/idriskulubi/gritraining.git
cd gritraining
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
gritraining/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React Components
│   ├── lib/                 # Utility functions
│   └── db/                  # Database configuration
├── public/                  # Static assets
└── drizzle/                # Database migrations
```

## Key Components

- **Dashboard:** Main interface showing referral stats and leaderboard
- **Leaderboard:** Real-time ranking of top referrers
- **ReferralLink:** Unique link generation and sharing
- **NoReferrals:** Interactive onboarding experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for GRI Training
- Powered by Next.js and Vercel
- Animations powered by Framer Motion

## Support

For support, email support@gritraining.com or join our Slack channel.


