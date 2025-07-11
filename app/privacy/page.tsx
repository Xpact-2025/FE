import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import PrivacyPopup from '../components/PrivacyPopup';

export default function privacy() {
  return (
    <>
      <div className="mb-[10%]">
        <Header />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-3 text-white text-sm leading-6">
        <h1 className="text-2xl font-bold">개인정보처리방침</h1>
      </div>
      <PrivacyPopup />
      <div className="px-[10%]">
        <Footer />
      </div>
    </>
  );
}
