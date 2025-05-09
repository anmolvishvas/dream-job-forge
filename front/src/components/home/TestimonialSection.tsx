import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchTestimonials } from "@/api/testimonial";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
};

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsPerView = 3;
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxIndex = Math.ceil(testimonials.length / testimonialsPerView) - 1;

  const showPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const getVisibleTestimonials = () => {
    const start = activeIndex * testimonialsPerView;
    return testimonials.slice(start, start + testimonialsPerView);
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment DreamJobForge aide candidats et recruteurs à
            atteindre leurs objectifs
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {getVisibleTestimonials().map((testimonial) => (
              <Card
                key={testimonial.id}
                className="flex-1 min-w-[300px] hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="mr-4 w-12 h-12 rounded-full bg-muted overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={showPrev}
              disabled={activeIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={showNext}
              disabled={activeIndex >= maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
