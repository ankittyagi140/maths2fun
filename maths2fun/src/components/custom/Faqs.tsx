import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const Faqs:React.FC=()=>{
    return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What age group is this suitable for?</AccordionTrigger>
            <AccordionContent>
            Our math puzzles are designed for children aged 5-14 years old. We have different difficulty levels to match your child's learning stage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does the reward system work?</AccordionTrigger>
            <AccordionContent>
            Kids earn stars and badges for completing puzzles and achieving high scores. These can be used to unlock new puzzle sets and special features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can parents track progress?</AccordionTrigger>
            <AccordionContent>
            Yes! Our parent dashboard provides detailed insights into your child's learning progress, including time spent, completed puzzles, and areas for improvement.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
            <AccordionContent>
            Yes! You can try our basic version for free, and Premium accounts come with a 7-day free trial. No credit card required for the basic version.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
}
export default Faqs;



  
