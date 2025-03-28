import NavBar from "../components/NavBar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex flex-col items-center px-8 py-16">
        <h1 className="text-[30px] font-bold font-[Pretendard] mb-12 self-start">내 프로필</h1>
        <div className="flex flex-col md:flex-row items-center w-full max-w-4xl space-y-10 md:space-y-0 md:space-x-20">
          
          <div className="flex">
            <img
              src="/profile-sample.png"
              alt="프로필 이미지"
              className="w-[220px] h-[220px] rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col space-y-4 w-full">
            {[
              { label: "이름", name: "name" },
              { label: "생년월일", name: "birth" },
              { label: "학력", name: "education" },
              { label: "이메일", name: "email" },
            ].map(({ label, name }) => (
              <div key={name} className="flex items-center space-x-4">
                <label className="w-20 text-[20px] font-semibold">{label}</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-500 bg-transparent rounded"
                />
              </div>
            ))}

            <div className="flex items-center space-x-4">
              <label className="w-20 text-[20px] font-semibold">희망직무</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-500 bg-transparent rounded"
              />
              <button className="w-8 h-8 bg-[#FF6D03] hover:bg-orange-600 text-white font-bold rounded">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl flex justify-end mt-16">
          <button className="px-8 py-2 bg-[#FF6D03] hover:bg-orange-600 text-white font-semibold rounded text-[20px]">
            저장
          </button>
        </div>

      </main>
    </div>
  );
}
