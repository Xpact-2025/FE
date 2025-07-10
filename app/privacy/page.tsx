import Header from '@/app/components/Header';
import Footer from '../components/Footer';

export default function privacy() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10 text-white text-sm leading-6 bg-black mt-[10%]">
        <h1 className="text-2xl font-bold mb-6">이용약관</h1>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제1조 (목적)</h2>
          <p>
            이 약관은 XPact(이하 ‘서비스’)의 이용조건 및 절차, 이용자와 서비스
            제공자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제2조 (정의)</h2>
          <p>① ‘이용자’란 본 약관에 따라 서비스를 이용하는 자를 말합니다.</p>
          <p>
            ② ‘서비스’란 사용자의 경험 입력을 기반으로 분석, 시각화, 추천 등을
            제공하는 웹 기반 서비스입니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제3조 (이용계약의 성립)</h2>
          <p>
            서비스는 이용자가 약관에 동의하고 서비스 접속 시 자동으로 계약이
            성립됩니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제4조 (서비스 내용 및 제공)</h2>
          <p>
            서비스는 사용자 입력 데이터를 바탕으로 커리어 분석, 시각화 및 추천
            기능을 제공합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제5조 (이용자의 의무)</h2>
          <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
          <p>① 허위 정보 입력 또는 타인의 정보 도용</p>
          <p>② 서비스 운영 방해 행위</p>
          <p>③ 기타 관계 법령에 위반되는 행위</p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제6조 (서비스의 변경 및 중단)</h2>
          <p>
            서비스는 사전 공지 없이 일부 기능을 수정, 변경 또는 중단할 수
            있습니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제7조 (개인정보 보호)</h2>
          <p>
            서비스는 사용자로부터 직접 입력된 정보 외에 어떠한 개인정보도
            수집하지 않습니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제8조 (지식재산권)</h2>
          <p>
            서비스에 포함된 콘텐츠 및 결과물의 저작권은 XPact 팀 또는 정당한
            권리자에게 귀속됩니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제9조 (책임의 한계)</h2>
          <p>
            서비스는 참고용 분석 결과를 제공하며, 이용자가 이를 활용해 취한
            행동에 대해서는 책임을 지지 않습니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">제10조 (분쟁 해결)</h2>
          <p>
            본 약관에 따른 분쟁은 서비스 제공자의 소재지를 관할하는 법원을 제1심
            관할 법원으로 합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">부칙</h2>
          <p>본 약관은 2025년 7월 6일부터 시행합니다.</p>
        </section>
      </div>
      <div className="px-[10%]">
        <Footer />
      </div>
    </>
  );
}
