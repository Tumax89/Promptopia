"use client";
// use client гэдэг нь useEffect-тэй холбоотой, дээрх кодыг бичихгүй бол ажиллахгүй
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  // Prodider-ийг бичсэний дараа useEffect-ийг оруулж ирнэ.
  // useEffect нь эхлэхдээ ганц удаа ажиллана. useEffect-ийн хамгийн сүүлийн [] дотор юу ч бичээгүй байгаа болохоор ганц л удаа ажиллана.
  // getProviders гэдгийг импортолж оруулж ирж байгаа.
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      // getProviders хүрч ирсэний дараа setProviders-тай адил байна???
      setProviders(response);
    };
    // setProviders хаана ч дуудагдаагүй байгаа болохоор доор дуудаж ажиллуулна. Энэ кодыг бичсэнээр google болон next auth-ийг ашиглан sign-in хийх боломжтой болгож байгаа юм
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* Хэрвээ хэрэглэгч мөн байх тохиолдолд ? тэмдэгийн дараагийн код ажиллана, хэрвээ хэрэглэгч биш байх тохиолдолд : -ийн дараах код ажиллана */}
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                className="rounded-full"
                width={37}
                height={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              // Хэрвээ providers-тэй холбогдсон тохиолдолд Object.values(providers) гэж provider-ийг дамжуулна, дараагаар нь map-аар давталт хийж бүх provider-уудыг нэг нэгээр нь авж, үр дүнд нь button-оор provider-руу буцаана. Энэ хийсэн бүхэн нь товчлуур дээр дарах үед бүгд signUp хэсэгтэй холбогдоно гэсэн үг. Энэ төсөл дээр бид ганц л provider ашиг лах бөгөөд тэр нь Google auth байх болно

              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              //  onClick={() => setToggleDropdown(!setToggleDropdown)}
              // onclick хийгдэх үед тухайн мөчид dropdown нээлттэй бол хаагдана, хаалттай бол нээгдэнэ (!setToggleDropdown) яг эсрэгээр нь хийнэ гэсэн үг.
              // React-ийг хөгжүүлэгчдийн зүгээс дараах аргыг хэрэглэхийг санал болгодгүй учир нь урьдчилан тооцоолохын аргагүй алдаа гарч болзошгүй юм. Учир нь хуучин байгаа state-ээ өөрчилж байгаа гэсэн үг.Харин тэрний оронд дараах аргыг хрэглэж болно.
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {/*  Хэрвээ toggleDropdown true байхын бол */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                {/*  Хэрвээ хэрэглэгч нэвтэрч орсон байгаа тохиолдолд буцах гарах товчийг дараах байдлаар хийнэ*/}
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
