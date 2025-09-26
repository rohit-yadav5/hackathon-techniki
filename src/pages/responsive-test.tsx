import { ResponsiveContainer, ResponsiveGrid, ResponsiveText, ResponsiveSpacing } from "@/components/ui/responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResponsiveTest() {
  return (
    <ResponsiveContainer maxWidth="7xl" padding="lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <ResponsiveText size="4xl" weight="bold" as="h1">
            Responsive Design Test
          </ResponsiveText>
          <ResponsiveText size="lg" color="muted">
            This page tests all the responsive components and utilities
          </ResponsiveText>
        </div>

        {/* Responsive Grid Test */}
        <div className="space-y-4">
          <ResponsiveText size="2xl" weight="semibold" as="h2">
            Responsive Grid Test
          </ResponsiveText>
          <ResponsiveGrid 
            cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            gap="lg"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="h-32">
                <CardHeader>
                  <CardTitle className="text-sm">Card {i + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    This card tests responsive grid behavior
                  </p>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </div>

        {/* Responsive Spacing Test */}
        <ResponsiveSpacing padding={{ all: 'lg' }} margin={{ y: 'md' }}>
          <Card>
            <CardHeader>
              <CardTitle>Responsive Spacing Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card tests responsive spacing utilities</p>
              <div className="mt-4 space-y-2">
                <Button size="sm">Small Button</Button>
                <Button>Default Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </CardContent>
          </Card>
        </ResponsiveSpacing>

        {/* Responsive Text Test */}
        <div className="space-y-4">
          <ResponsiveText size="2xl" weight="semibold" as="h2">
            Responsive Text Test
          </ResponsiveText>
          <div className="space-y-2">
            <ResponsiveText size="xs">Extra Small Text</ResponsiveText>
            <ResponsiveText size="sm">Small Text</ResponsiveText>
            <ResponsiveText size="base">Base Text</ResponsiveText>
            <ResponsiveText size="lg">Large Text</ResponsiveText>
            <ResponsiveText size="xl">Extra Large Text</ResponsiveText>
            <ResponsiveText size="2xl">2XL Text</ResponsiveText>
            <ResponsiveText size="3xl">3XL Text</ResponsiveText>
          </div>
        </div>

        {/* Breakpoint Indicator */}
        <Card>
          <CardHeader>
            <CardTitle>Current Breakpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">xs</div>
                <div className="text-xs text-muted-foreground">≤480px</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">sm</div>
                <div className="text-xs text-muted-foreground">≤640px</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">md</div>
                <div className="text-xs text-muted-foreground">≤768px</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">lg</div>
                <div className="text-xs text-muted-foreground">≤1024px</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">xl</div>
                <div className="text-xs text-muted-foreground">≤1280px</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-xs font-medium">2xl</div>
                <div className="text-xs text-muted-foreground">≥1536px</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveContainer>
  );
}
