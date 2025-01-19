import { ReactNode } from "react";
import { Link } from "react-router-dom"

interface LinkPropos{
    to: string;
    children: ReactNode;
}

export function LinkContent({ to, children }: LinkPropos){
    return(
        <Link to={to}>
            {children}
        </Link>
    )
}