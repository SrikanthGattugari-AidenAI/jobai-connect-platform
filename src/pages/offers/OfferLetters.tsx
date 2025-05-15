
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOfferLetters } from "@/context/OfferLetterContext";
import { OfferLetterList } from "@/components/offers/OfferLetterList";
import { OfferLetterDetail } from "@/components/offers/OfferLetterDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { OfferLetter } from "@/types/offer";
import { useToast } from "@/components/ui/use-toast";

const OfferLetters = () => {
  const { offerLetters, isLoading, signOffer, rejectOffer } = useOfferLetters();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"unsigned" | "signed">("unsigned");
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("OfferLetters component mounted");
    console.log("Current offer letters:", offerLetters);
    
    // Auto-select the first offer if available
    if (offerLetters.length > 0 && !selectedOfferId) {
      const tabOffers = offerLetters.filter(offer => 
        activeTab === "unsigned" 
          ? offer.status === "unsigned" 
          : ["signed", "rejected"].includes(offer.status)
      );
      
      if (tabOffers.length > 0) {
        setSelectedOfferId(tabOffers[0].id);
      }
    }
  }, [offerLetters, activeTab, selectedOfferId]);

  const handleSelectOffer = (offer: OfferLetter) => {
    setSelectedOfferId(offer.id);
    console.log("Selected offer:", offer);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "unsigned" | "signed");
    setSelectedOfferId(null);
    console.log("Tab changed to:", value);
  };
  
  const handleSignOffer = (id: string) => {
    signOffer(id);
    toast({
      title: "Offer Signed",
      description: "You've successfully signed the offer letter.",
      variant: "default",
    });
  };
  
  const handleRejectOffer = (id: string) => {
    rejectOffer(id);
    toast({
      title: "Offer Rejected",
      description: "You've rejected the offer letter.",
      variant: "destructive",
    });
  };

  const filteredOffers = offerLetters.filter(offer => {
    if (activeTab === "unsigned") {
      return offer.status === "unsigned";
    } else {
      return offer.status === "signed" || offer.status === "rejected";
    }
  });

  const selectedOffer = offerLetters.find(offer => offer.id === selectedOfferId);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Offer Letters</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-2" />
              <Skeleton className="h-24 w-full mb-2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Offer Letters</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Tabs defaultValue="unsigned" onValueChange={handleTabChange}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="unsigned" className="flex-1">Unsigned</TabsTrigger>
                <TabsTrigger value="signed" className="flex-1">Signed/Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="unsigned" className="mt-0">
                <OfferLetterList 
                  offerLetters={filteredOffers}
                  onSelectOffer={handleSelectOffer}
                  selectedOfferId={selectedOfferId}
                />
              </TabsContent>
              
              <TabsContent value="signed" className="mt-0">
                <OfferLetterList 
                  offerLetters={filteredOffers}
                  onSelectOffer={handleSelectOffer}
                  selectedOfferId={selectedOfferId}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2">
            {selectedOffer ? (
              <OfferLetterDetail 
                offer={selectedOffer}
                onSign={handleSignOffer}
                onReject={handleRejectOffer}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-muted-foreground border rounded-lg bg-muted/10">
                <p className="mb-2">Select an offer letter to view details</p>
                <p className="text-sm">You can view, sign or reject your offer letters here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OfferLetters;
