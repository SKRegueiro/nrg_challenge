import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type Principal from "@/types/Principal";

type Props = {
  principals: Principal[];
};

export default function ProjectList({ principals }: Props) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {principals.map((principal) => (
          <Card
            key={principal.id}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                {principal.name}
              </CardTitle>
              <Badge variant="secondary" className="text-lg font-semibold">
                {principal.short_name}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Project ID: {principal.id}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
