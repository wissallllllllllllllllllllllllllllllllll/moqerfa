import React from "react";
import Link from "next/link";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  if (href) {
    return (
        <li>
          <Link href={href} passHref>
            <Typography
                as="span"
                variant="small"
                className="font-medium cursor-pointer"
            >
              {children}
            </Typography>
          </Link>
        </li>
    );
  }
  return (
      <li>
        <Typography as="span" variant="small" className="font-medium">
          {children}
        </Typography>
      </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <MTNavbar
          fullWidth
          shadow={false}
          blurred={false}
          color={isScrolling ? "white" : "transparent"}
          className="fixed top-0 z-50 border-0"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Typography
              as="a"
              href="/"
              variant="h6"
              color={isScrolling ? "gray" : "white"}
          >
            SmartPathAI
          </Typography>
          <ul
              className={`ml-10 hidden items-center gap-6 lg:flex ${
                  isScrolling ? "text-gray-900" : "text-white"
              }`}
          >
            <NavItem href="/">Acceuil</NavItem>

            <NavItem href="/cours">Cours</NavItem>

            <NavItem href="/tableau">Tableau de bord</NavItem>
            <NavItem href="/profil">Profil</NavItem>
          </ul>
          <div className="hidden gap-2 lg:flex lg:items-center"></div>
        </div>

        <Collapse open={open}>
          <div className="container mx-auto mt-4 rounded-lg border-t border-blue-gray-50 bg-white px-6 py-5">
            <ul className="flex flex-col gap-4 text-blue-gray-900">
              <NavItem href="/">Acceuil</NavItem>
              <NavItem href="/cours">Cours</NavItem>
              <NavItem href="/tableau">Tableau de bord</NavItem>
              <NavItem href="/profil">Profil</NavItem>

            </ul>
            <div className="mt-4 flex items-center gap-2">
              <IconButton variant="text" color="gray" size="sm">
                <i className="fa-brands fa-twitter text-base" />
              </IconButton>
              <IconButton variant="text" color="gray" size="sm">
                <i className="fa-brands fa-facebook text-base" />
              </IconButton>
              <IconButton variant="text" color="gray" size="sm">
                <i className="fa-brands fa-instagram text-base" />
              </IconButton>
              <a href="https://www.material-tailwind.com/blocks" target="_blank">
                <Button color="gray" size="sm" className="ml-auto">
                  Blocks
                </Button>
              </a>
            </div>
          </div>
        </Collapse>
      </MTNavbar>
  );
}

export default Navbar;
