import Link from "next/link";

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "UX Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
];

export default function NavMenu() {

    return(
        <>
            {navigation.map((item) => (

                <Link
                key={item.href}
                href={item.href}
                className="text-xl font-mono italic uppercase duration-200 p-4 bg-gradient-to-b from-[#c72872] from-[20%] to-[#F470AE] hover:text-zinc-300 text-transparent underline underline-offset-4 bg-clip-text decoration-[#F470AE] hover:decoration-white"
                >
                {item.name}
                </Link>
            ))}
        </>
    );
}