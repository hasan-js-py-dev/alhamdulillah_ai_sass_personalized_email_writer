import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { UploadCloud, FileText, ArrowRight } from 'lucide-react';
export function BulkCopyWriter() {
  return <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-warm-gray mb-3">
          Ready to create something amazing?
        </h2>
        <p className="text-warm-gray-light text-lg">
          Upload your topics and let's generate content in bulk.
        </p>
      </div>

      <Card className="border-2 border-dashed border-warm-gray/20 bg-warm-cream/30 min-h-[400px] flex flex-col items-center justify-center text-center p-12 hover:border-soft-blue/50 hover:bg-soft-blue/5 transition-all duration-300 group cursor-pointer">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
          <UploadCloud className="w-10 h-10 text-soft-blue" />
        </div>

        <h3 className="text-xl font-semibold text-warm-gray mb-2">
          Drop your CSV file here
        </h3>
        <p className="text-warm-gray-light mb-8 max-w-md mx-auto">
          Or click to browse your files. We support CSV and Excel files with up
          to 100 topics per batch.
        </p>

        <Button variant="primary" size="lg">
          Select Files
        </Button>

        <div className="mt-8 flex items-center gap-2 text-sm text-warm-gray-light">
          <FileText className="w-4 h-4" />
          <span>Need a template?</span>
          <a href="#" className="text-soft-blue hover:underline font-medium">
            Download sample CSV
          </a>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[{
        step: 1,
        text: 'Upload your topics'
      }, {
        step: 2,
        text: 'Choose your tone'
      }, {
        step: 3,
        text: 'Get bulk results'
      }].map((item, i) => <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-warm-gray/5 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gentle-orange/10 text-gentle-orange font-bold flex items-center justify-center flex-shrink-0">
              {item.step}
            </div>
            <span className="font-medium text-warm-gray">{item.text}</span>
            {i < 2 && <ArrowRight className="w-4 h-4 text-warm-gray-light ml-auto hidden md:block" />}
          </div>)}
      </div>
    </div>;
}