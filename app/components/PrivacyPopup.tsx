export default function PrivacyPopup() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 pb-5 text-white text-sm leading-6">
        {/* <h1 className="text-2xl font-bold mb-6">개인정보처리방침</h1> */}

        <section className="mb-5">
          <p>
            XPact(이하 ‘서비스’)는「개인정보 보호법」등 관련 법령을 준수하며,
            이용자의 개인정보를 안전하게 보호하기 위해 최선을 다합니다. 본
            방침은 서비스 이용과 관련하여 수집되는 개인정보의 항목, 수집 목적,
            보유 기간 및 이용자의 권리 등에 대해 안내합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">1. 수집하는 개인정보 항목</h2>
          <p className="text-[16px]">[1] 회원가입 시 수집 항목</p>
          <li className="px-3">자체 가입: 이름, 이메일, 비밀번호</li>
          <li className="px-3">소셜 로그인(카카오, 네이버): 이름, 이메일</li>

          <p className="text-[16px]">[2] 프로필 입력 시 수집 항목</p>
          <li className="px-3">이름, 나이</li>
          <li className="px-3">학력: 학위, 학교명, 학과명, 졸업 구분</li>
          <li className="px-3">희망 직무</li>

          <p className="text-[16px]">[3] 서비스 이용 시 자동 수집 항목</p>
          <li className="px-3">
            접속 IP, 브라우저 및 기기 정보, 접속 일시, 서비스 이용 기록 등
          </li>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">2. 개인정보 수집 및 이용 목적</h2>
          <p>수집된 개인정보는 다음의 목적을 위해 활용됩니다.</p>
          <li className="px-3">회원 식별 및 로그인 기능 제공</li>
          <li className="px-3">사용자 맞춤형 경험 분석 및 커리어 시각화 </li>
          <li className="px-3">활동 추천 및 대시보드 제공</li>
          <li className="px-3">고객 문의 응대 및 서비스 품질 개선</li>
          <li className="px-3">서비스 통계 분석 및 운영 관리</li>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">3. 개인정보 보유 및 이용 기간</h2>
          <p>
            개인정보는 회원 탈퇴 시까지 보관되며, 탈퇴 요청 시 즉시 파기됩니다.
          </p>
          <p>※ 현재 탈퇴 기능은 개발 중입니다. 탈퇴를 원하실 경우,</p>
          <p>
            [xpact.team@gmail.com] 으로 요청해 주시면, 운영팀이 확인 후 7일
            이내에 수동으로 탈퇴 및 개인정보 삭제를 진행합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">4. 개인정보의 제3자 제공</h2>
          <p>XPact는 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
          <p>
            단, 관련 법령에 근거하거나 이용자의 사전 동의가 있는 경우에 한해
            예외적으로 제공될 수 있습니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">5. 개인정보 처리 위탁</h2>
          <p>
            현재 XPact는 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다.
          </p>
          <p>
            향후 위탁이 발생할 경우, 해당 내용은 본 방침을 통해 사전 공지합니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">6. 이용자의 권리 및 행사 방법</h2>
          <p>
            이용자는 언제든지 본인의 개인정보에 대해 다음과 같은 권리를 행사할
            수 있습니다.
          </p>
          <li className="px-3">열람, 수정, 삭제, 처리 정지 요청</li>
          <p>
            요청은 서비스 내 [마이페이지] 또는 이메일(xpact.team@gmail.com)을
            통해 접수하실 수 있습니다.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">7. 개인정보 파기 절차 및 방법</h2>
          <p>개인정보는 수집 목적이 달성되면 즉시 파기됩니다.</p>
          <li className="px-3">전자 파일: 복구 불가능한 방식으로 영구 삭제</li>
          <li className="px-3">출력물: 분쇄 또는 소각</li>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">8. 개인정보 보호를 위한 조치</h2>
          <li className="px-3">개인정보는 암호화되어 안전하게 저장됩니다.</li>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">9. 개인정보 보호책임자</h2>
          <li className="px-3">책임자: XPact 운영팀</li>
          <li className="px-3">이메일: xpact.team@gmail.com</li>
        </section>

        <section className="mb-5">
          <h2 className="font-bold text-lg">10. 고지 및 변경</h2>
          <p>
            본 방침은 시행일로부터 적용되며, 내용 변경 시 사전 고지 후
            시행됩니다.
          </p>
          <p>변경 사항은 서비스 내 공지사항을 통해 안내드립니다.</p>
          <p>시행일: 2025년 7월 6일</p>
        </section>
      </div>
    </>
  );
}
