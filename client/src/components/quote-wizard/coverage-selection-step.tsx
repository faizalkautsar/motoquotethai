import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function CoverageSelectionStep() {
  const { t } = useTranslation();
  const form = useFormContext();

  const coverageTypes = [
    {
      value: 'type1',
      title: 'Type 1 - Comprehensive',
      description: 'Full protection including own damage',
      recommended: true,
      price: '~฿15,000',
    },
    {
      value: 'type2',
      title: 'Type 2+ - Major Damage',
      description: 'Fire, theft & third-party coverage',
      recommended: false,
      price: '~฿8,500',
    },
    {
      value: 'type3',
      title: 'Type 3 - Third Party',
      description: 'Basic third-party liability only',
      recommended: false,
      price: '~฿3,200',
    },
  ];

  const additionalOptions = [
    { id: 'flood', label: 'Flood Coverage', price: '+฿800/year' },
    { id: 'fire', label: 'Fire Protection', price: '+฿600/year' },
    { id: 'theft', label: 'Theft Coverage', price: '+฿1,200/year' },
    { id: 'driver-pa', label: 'Personal Accident for Driver', price: '+฿500/year' },
    { id: 'passenger', label: 'Passenger Protection', price: '+฿600/year' },
    { id: 'windshield', label: 'Windshield Protection', price: '+฿400/year' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-4 mb-6 border-2 border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">
          {t('coverageSelectionTitle')}
        </h3>
        <p className="text-sm text-indigo-700">
          {t('coverageSelectionSubtitle')}
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="coverageType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-4"
              >
                {coverageTypes.map((coverage) => (
                  <label
                    key={coverage.value}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-6 transition-all ${
                      field.value === coverage.value
                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg ring-2 ring-indigo-200'
                        : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/50'
                    }`}
                    data-testid={`radio-coverage-${coverage.value}`}
                  >
                    <RadioGroupItem value={coverage.value} className="sr-only" />
                    <div className="flex items-start space-x-4 w-full">
                      <i className={`fas fa-shield ${field.value === coverage.value ? 'text-indigo-600' : 'text-primary'} text-2xl mt-1`}></i>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-bold text-lg ${field.value === coverage.value ? 'text-indigo-900' : 'text-gray-800'}`}>{coverage.title}</h4>
                          {coverage.recommended && (
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${field.value === coverage.value ? 'text-indigo-700' : 'text-muted'}`}>{coverage.description}</p>
                      </div>
                      <span className={`font-bold whitespace-nowrap ${field.value === coverage.value ? 'text-indigo-600' : 'text-primary'}`}>{coverage.price}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="deductible"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Deductible Amount <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
                className="space-y-3"
              >
                {[
                  { value: 0, label: '฿0', description: 'No deductible - Higher premium' },
                  { value: 5000, label: '฿5,000', description: 'Standard deductible - Recommended' },
                  { value: 10000, label: '฿10,000', description: 'Lower premium option' },
                  { value: 15000, label: '฿15,000', description: 'Lowest premium' },
                ].map((deductible) => (
                  <label
                    key={deductible.value}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      field.value === deductible.value
                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md ring-2 ring-indigo-200'
                        : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/50'
                    }`}
                    data-testid={`radio-deductible-${deductible.value}`}
                  >
                    <RadioGroupItem value={deductible.value.toString()} className="sr-only" />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className={`font-semibold ${field.value === deductible.value ? 'text-indigo-900' : 'text-gray-800'}`}>{deductible.label}</p>
                        <p className={`text-sm ${field.value === deductible.value ? 'text-indigo-600' : 'text-muted'}`}>{deductible.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="additionalCoverage"
        render={() => (
          <FormItem>
            <FormLabel>Additional Coverage Options</FormLabel>
            <div className="space-y-3">
              {additionalOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="additionalCoverage"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all ${
                          field.value?.includes(option.id)
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-indigo-400'
                        }`}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option.id
                                    )
                                  )
                            }}
                            data-testid={`checkbox-addon-${option.id}`}
                          />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="font-medium cursor-pointer">
                            {option.label}
                          </FormLabel>
                          <p className="text-sm text-muted">{option.price}</p>
                        </div>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
