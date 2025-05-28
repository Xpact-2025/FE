import Image from 'next/image';

interface GuideModalProps {
  title: string;
  type: 'star' | 'simple';
  closeRequest: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({
  title,
  type,
  closeRequest,
}) => {
  const renderContent = () => {
    if (type === 'star') {
      return (
        <div className="text-stone-300 font-medium">
          <p>
            STAR 방식은 경험을 상황(Situation), 문제(Task), 해결(Action),
            결과(Result) 순으로 구조화해 서술하는 방법입니다.
          </p>
          <p>
            면접, 자기소개서, 회고 등에 자주 쓰이며, 문제 해결 과정을 명확하게
            보여줄 수 있어요.
          </p>
          <br></br>

          <p>상황(S): 어떤 배경에서 활동을 하게 되었는지 소개해 주세요.</p>
          <p>
            → 예:
            {` "데이터 분석 수업에서 이커머스 리뷰 데이터를 분석하는 팀 프로젝트를 진행했습니다."`}
          </p>
          <br></br>

          <p>
            문제(T): 그 안에서 실제로 겪은 문제나 과제를 구체적으로 써 주세요.
          </p>
          <p>
            → 예:
            {` "리뷰와 평점의 관계가 애매해 분석 기준을 정하기 어려웠습니다."`}
          </p>
          <br></br>

          <p>
            해결 방법(A): 문제를 해결하기 위해 어떤 행동을 했는지 설명해 주세요.
          </p>
          <p>
            → 예:
            {` "감성 사전을 적용해 텍스트를 수치화하고, 리뷰 유형을 클러스터링해 분석 방향을 구체화했습니다."`}
          </p>
          <br></br>

          <p>결과(R): 행동의 결과, 변화 또는 배운 점을 정리해 주세요.</p>
          <p>
            → 예:
            {` "감성 클러스터별 평점 분포를 비교해 ‘배송’ 관련 이슈가 저평점의 핵심 요인임을 정량적으로 입증했으며, 
데이터 기반 가설 설정의 중요성을 배웠습니다."`}
          </p>
        </div>
      );
    }

    if (type === 'simple') {
      return (
        <div className="text-stone-300 font-medium">
          <p>
            간결 양식은 경험을 역할과 주요 성과 중심으로 요약해 정리하는
            방식입니다.
          </p>
          <p>
            짧은 문장으로 내가 어떤 일을 했고, 어떤 성과를 냈는지를 빠르게
            보여줄 수 있어요.
          </p>
          <br></br>

          <p>
            역할: 경험 속에서 내가 맡았던 역할과 수행한 주요 업무를 작성해
            주세요.
          </p>
          <p>
            → 예:
            {` "데이터 전처리와 모델링을 전담하고, 분석 결과를 바탕으로 팀 발표 자료를 제작했습니다."`}
          </p>
          <br></br>

          <p>
            주요 성과: 내가 기여한 결과나 변화, 또는 외부로부터 받은 평가 등을
            정리해 주세요.
          </p>
          <p>
            → 예:
            {` "모델 정확도를 82%까지 향상시켰고, 분석 결과가 최종 발표에서 우수 사례로 선정되었습니다."`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-end"
      onClick={closeRequest}
    >
      <div className="flex flex-col" onClick={e => e.stopPropagation()}>
        <Image
          src="/images/Modal_Polygon.svg"
          alt="profile"
          width={74}
          height={42}
          className="absolute top-[305px] right-[78px]"
        />
        <div className="absolute bg-gray-700 p-6 rounded-2xl top-[325px] right-[78px] w-[758px]">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
