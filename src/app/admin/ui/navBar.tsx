import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import routes from "@/constants/routes";

export default function NavBar() {
  return (
    <nav className="bg-background border-b">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={routes.DASHBOARD} passHref>
              <Button variant="ghost" className="text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </nav>
  )
}
