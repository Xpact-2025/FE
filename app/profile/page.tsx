import ProfileForm from './components/ProfileForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default async function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ProfileForm />
      <Footer />
    </div>
  );
}
