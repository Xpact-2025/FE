import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import TermsPopup from '../components/TermsPopup copy';

export default function TermsPage() {
  return (
    <>
      <div className="mb-[10%]">
        <Header />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-3 text-white text-sm leading-6">
        <h1 className="text-2xl font-bold">이용약관</h1>
      </div>
      <TermsPopup />
      <div className="px-[10%]">
        <Footer />
      </div>
    </>
  );
}
