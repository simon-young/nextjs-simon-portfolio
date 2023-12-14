import Link from "next/link";

const navigation = [
    { name: "UX Case Studies", href: "folio/case-studies" },
    { name: "Work", href: "folio/work" },
    { name: "Contact", href: "folio/contact" },
];

export default function NavMenuDesktop() {

    return(
        <>
            {navigation.map((item, index) => (

                <Link
                key={index}
                href={item.href}
                className="text-xl font-mono italic uppercase duration-200 p-4 bg-gradient-to-b from-[#c72872] from-[20%] to-[#F470AE] hover:text-zinc-300 text-transparent bg-clip-text"
                >
                {item.name}
                </Link>
            ))}
        </>
    );
}