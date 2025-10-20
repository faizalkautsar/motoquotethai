import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, ShieldCheck, Shield, Car } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { parsePayload } from '@/lib/parsePayload';

const testResponse = {
    self: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/385632ad-e032-4e01-9357-8eaa5055165b/',
        id: '385632ad-e032-4e01-9357-8eaa5055165b',
    },
    number: 'QT-20251020-0016763',
    agent: {
        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/f31404d9-799d-40fe-abb5-936986fcad81/',
        id: 'f31404d9-799d-40fe-abb5-936986fcad81',
    },
    holder: {
        self: {
            href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/2593edd6-0465-4119-b685-3afdad63bb5c/',
            id: '2593edd6-0465-4119-b685-3afdad63bb5c',
        },
        number: 'BP-011214',
        title: 'Mr',
        firstName: 'Jess',
        middleName: null,
        lastName: 'Bosco',
        fullName: 'Jess Bosco',
        nickname: '',
        profilePicture: null,
        gender: null,
        dob: '1988-03-06',
        maritalStatus: null,
        occupation: '',
        education: null,
        nationality: null,
        registrationName: '',
        registrationCode: '',
        companyLegalStructure: null,
        companyFoundingDate: null,
        companySize: '',
        category: 'Person',
        company: null,
        group: null,
        correspondenceLanguage: 'en',
        email: 'ayman_test_motor_vehicle_245f3@testing.com',
        emailPrimary: 'ayman_test_motor_vehicle_245f3@testing.com',
        emailCorrespondence: null,
        emailBilling: '',
        emailWork: '',
        emailOther: '',
        phone: '+442071234567',
        phoneMobile: '+442071234567',
        phoneWork: '',
        phoneHome: '',
        phoneFax: '',
        preferredCommunicationChannels: null,
        prefersNoContact: false,
        roles: [
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/roles/1b6ee4d2-5846-4cd3-8ae5-d2aa0dbc9008/',
                id: '1b6ee4d2-5846-4cd3-8ae5-d2aa0dbc9008',
            },
        ],
        isActive: false,
        addresses: [
            {
                self: {
                    href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/addresses/50944255-3b20-45b1-9838-19aee027ba73/',
                    id: '50944255-3b20-45b1-9838-19aee027ba73',
                },
                types: ['DEFAULT'],
                details: {
                    id: 'fc810290-ae07-4836-8d9e-f923fdae6970',
                    line1: 'Siam Paragon',
                    line2: '991 Rama I Road',
                    line3: 'Pathum Wan',
                    postalCode: '10330',
                    unitNo: null,
                    building: null,
                    district: null,
                    city: 'Bangkok',
                    state: 'Bangkok',
                    country: 'TH',
                    fullAddress: 'Siam Paragon, 991 Rama I Road, Pathum Wan, 10330 Bangkok, Bangkok, TH',
                    extraData: {
                        line4: 'Pathum Wan District',
                        latitude: '13.7456',
                        longitude: '100.5347',
                    },
                },
                businessPartner: {
                    href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/2593edd6-0465-4119-b685-3afdad63bb5c/',
                    id: '2593edd6-0465-4119-b685-3afdad63bb5c',
                },
                isDefault: true,
                links: [
                    {
                        rel: 'business_partners',
                        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/',
                    },
                ],
                createdAt: '2025-10-20T12:20:18.959071+02:00',
                updatedAt: '2025-10-20T12:20:18.968162+02:00',
            },
        ],
        incompleteOrders: [
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/1aac3bad-72e7-4b26-92c7-0f3549df8e15/',
                id: '1aac3bad-72e7-4b26-92c7-0f3549df8e15',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/016a5ab1-5ee5-4479-ad67-f267c4181b0a/',
                id: '016a5ab1-5ee5-4479-ad67-f267c4181b0a',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/5590e06b-daee-423c-925c-0c3ba23ab74c/',
                id: '5590e06b-daee-423c-925c-0c3ba23ab74c',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/2544c2a9-08e6-4287-a09c-b1fa9fa82998/',
                id: '2544c2a9-08e6-4287-a09c-b1fa9fa82998',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/555a7000-b5ef-4de9-8225-d3f0d1497324/',
                id: '555a7000-b5ef-4de9-8225-d3f0d1497324',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/d0d2deb5-a241-4d5f-8dce-49ba2a78e805/',
                id: 'd0d2deb5-a241-4d5f-8dce-49ba2a78e805',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/7c9074ec-333f-4bf8-81f5-d1c21e19afe0/',
                id: '7c9074ec-333f-4bf8-81f5-d1c21e19afe0',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/8e1088a9-3653-424b-9f28-049c1e0ce49b/',
                id: '8e1088a9-3653-424b-9f28-049c1e0ce49b',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/aadaa925-bdfb-4314-88bb-6cf55b1d56b2/',
                id: 'aadaa925-bdfb-4314-88bb-6cf55b1d56b2',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/385632ad-e032-4e01-9357-8eaa5055165b/',
                id: '385632ad-e032-4e01-9357-8eaa5055165b',
            },
        ],
        policies: [
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/bc658e5c-2172-4a5b-a1d2-6015b8c6b3af/',
                id: 'bc658e5c-2172-4a5b-a1d2-6015b8c6b3af',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/a6486a86-8792-47ba-b018-b2afd8e27446/',
                id: 'a6486a86-8792-47ba-b018-b2afd8e27446',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/7b9aa6dd-8b49-47c8-bf08-ccfd2a92aa88/',
                id: '7b9aa6dd-8b49-47c8-bf08-ccfd2a92aa88',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/7386dde9-34fe-4e65-ae53-f20678dae7b6/',
                id: '7386dde9-34fe-4e65-ae53-f20678dae7b6',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/f0957f3f-3846-434b-a6e2-47b90f6de0d8/',
                id: 'f0957f3f-3846-434b-a6e2-47b90f6de0d8',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/0abb65d5-4f47-4608-a715-2f62aabe91c6/',
                id: '0abb65d5-4f47-4608-a715-2f62aabe91c6',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/b00fd064-74e1-4034-8143-d1b856f1e473/',
                id: 'b00fd064-74e1-4034-8143-d1b856f1e473',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/7b2e9900-f299-436c-855d-1852dfe79237/',
                id: '7b2e9900-f299-436c-855d-1852dfe79237',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/4d4f73f5-766b-44e3-ab71-913c035aabec/',
                id: '4d4f73f5-766b-44e3-ab71-913c035aabec',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/d89881b1-7703-4c0a-94c3-6720f1ae19db/',
                id: 'd89881b1-7703-4c0a-94c3-6720f1ae19db',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/3f056b9c-9ed8-472c-8d56-e8b0b4c8ea19/',
                id: '3f056b9c-9ed8-472c-8d56-e8b0b4c8ea19',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/f6e27fee-b579-4c92-8eee-4b161f48ab3f/',
                id: 'f6e27fee-b579-4c92-8eee-4b161f48ab3f',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/f5191f11-7bc1-4bdb-958a-e2e4420b9a30/',
                id: 'f5191f11-7bc1-4bdb-958a-e2e4420b9a30',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/517d9ed4-0078-4439-9d08-08b4f67a6736/',
                id: '517d9ed4-0078-4439-9d08-08b4f67a6736',
            },
        ],
        activePolicyRelations: [],
        pendingPolicyRelations: [],
        consentManagement: [],
        idType: null,
        idNumber: 'Pedro396',
        idIssueDate: null,
        telematicsEnabled: false,
        duplicateCheckResponse: null,
        extraData: [
            {
                key: 'occupation',
                value: 'Software Engineer',
                key_display: 'Occupation',
                value_display: 'Software Engineer',
            },
            {
                key: 'driver_age_range',
                value: '26_35',
                key_display: 'Driver Age Range',
                value_display: '26-35',
            },
            {
                key: 'driving_experience',
                value: '6_10',
                key_display: 'Driving Experience',
                value_display: '6-10 years',
            },
            {
                key: 'claims_history_past_3_years',
                value: '0',
                key_display: 'Claims History (Past 3 years)',
                value_display: 'No Claims',
            },
            {
                key: 'no_claims_bonus_ncb',
                value: true,
                key_display: 'No Claims Bonus (NCB)',
                value_display: 'Yes, I have NCB',
            },
        ],
        createdAt: '2025-10-16T12:20:06.882777+02:00',
        updatedAt: '2025-10-17T11:30:59.161693+02:00',
        links: [
            {
                rel: 'addresses',
                href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/addresses/',
            },
            {
                rel: 'incomplete_orders',
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/',
            },
            {
                rel: 'policies',
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/',
            },
            {
                rel: 'policy_relations',
                href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/policy-relations/',
            },
            {
                rel: 'agents',
                href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/agents/',
            },
        ],
        paperDocumentEnabled: false,
        policyAutoRenewal: true,
        bankAccount: null,
        creator: 'Core Development API',
        owner: null,
        paymentData: {},
        gdprStatus: null,
        attributeValues: [],
    },
    product: {
        href: 'https://sandbox-bo.i2go.io/api/v3/product-service/products/79fc572a-152b-4f02-91b3-ae4742ef37a7/',
        id: '79fc572a-152b-4f02-91b3-ae4742ef37a7',
    },
    productPlan: {
        self: {
            href: 'https://sandbox-bo.i2go.io/api/v3/product-service/plans/2cf2be54-d14e-44d9-8542-27b1f2658dd3/',
            id: '2cf2be54-d14e-44d9-8542-27b1f2658dd3',
        },
        name: '1 Plus',
        slug: 'comprehensive',
        description: '',
        product: {
            href: 'https://sandbox-bo.i2go.io/api/v3/product-service/products/79fc572a-152b-4f02-91b3-ae4742ef37a7/',
            id: '79fc572a-152b-4f02-91b3-ae4742ef37a7',
        },
        coverages: [
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/product-coverages/2fa59e71-48ff-4f30-b8d6-edd56144df6e/',
                id: '2fa59e71-48ff-4f30-b8d6-edd56144df6e',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/product-coverages/2ef12b67-4a78-499d-ac28-a04f74302480/',
                id: '2ef12b67-4a78-499d-ac28-a04f74302480',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/product-coverages/ae8234f8-9c9e-4b34-a416-ad7ae02f7cac/',
                id: 'ae8234f8-9c9e-4b34-a416-ad7ae02f7cac',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/product-coverages/77dd46c4-3c7b-4012-8a91-c061d3a246e1/',
                id: '77dd46c4-3c7b-4012-8a91-c061d3a246e1',
            },
            {
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/product-coverages/880e724c-2ac6-47d0-908a-a0b147e9a697/',
                id: '880e724c-2ac6-47d0-908a-a0b147e9a697',
            },
        ],
        isDefault: true,
        attributes: {},
        links: [
            {
                rel: 'products',
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/products/',
            },
            {
                rel: 'product_attachments',
                href: 'https://sandbox-bo.i2go.io/api/v3/product-service/attachments/',
            },
        ],
        createdAt: '2025-09-11T10:07:33.894350+02:00',
        updatedAt: '2025-10-15T09:39:59.896336+02:00',
    },
    status: 'Quoted',
    lineOfBusiness: 'Motor Vehicle',
    submissionType: '',
    underwriter: '',
    agentCompany: 'tigerlab',
    receivedDate: null,
    approvedForRenewal: false,
    paymentScheme: 'Yearly',
    paymentDay: null,
    classification: null,
    startDate: '2025-12-20',
    endDate: '2026-12-20',
    startDateOverride: null,
    endDateOverride: null,
    followUpDate: null,
    progress: 80,
    netAmount: '15000.00',
    loadingAmount: '1660.00',
    netLoadAmount: '16660.00',
    grossAmount: '16660.00',
    iptAmount: '0.00',
    finalAmount: '16660.00',
    totalPayableAmount: '16900.00',
    proratedAmount: '16900.00',
    adminFee: '240.00',
    commissionAmount: null,
    pricingBreakdown: {
        premiums: {
            yearly: {
                totalPayableAmount: 16900,
            },
            monthly: {
                totalPayableAmount: 1408.3333333333333,
            },
        },
    },
    pricingDeviation: {
        iptAmount: 0.0,
        netAmount: 15000.0,
        finalAmount: 16660.0,
        loadingAmount: 1660.0,
        premiumAmount: 16660.0,
        netLoadAmount: 16660.0,
        proratedAmount: 16900.0,
        pricingBreakdown: {
            premiums: {
                yearly: {
                    totalPayableAmount: 16900,
                },
                monthly: {
                    totalPayableAmount: 1408.3333333333333,
                },
            },
        },
        totalPayableAmount: 16900.0,
    },
    voucherAttributes: null,
    campaignAttributes: null,
    businessPartnerRelations: [],
    policyTerm: 'Yearly',
    recurrenceScheme: 'Yearly',
    policyVersion: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/efa43fe2-05bb-4957-a40e-b9daafa3897e/',
        id: 'efa43fe2-05bb-4957-a40e-b9daafa3897e',
    },
    items: [
        {
            self: {
                href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/items/c64f5ab1-bc3b-45ee-9891-e506bf18f290/',
                id: 'c64f5ab1-bc3b-45ee-9891-e506bf18f290',
            },
            parent: null,
            riskId: null,
            name: 'Toyota Corolla 1.8 2021 1033',
            slug: 'toyota-corolla-1-8-2021-1033',
            number: null,
            amount: '0.00',
            startDate: null,
            endDate: null,
            details: {},
            attributes: [
                {
                    key: 'car_brand',
                    value: 'Toyota',
                    key_display: 'Car Brand',
                    value_display: 'Toyota',
                },
                {
                    key: 'car_model',
                    value: 'Corolla 1.8',
                    key_display: 'Car Model',
                    value_display: 'Corolla 1.8',
                },
                {
                    key: 'year',
                    value: '2021',
                    key_display: 'Year',
                    value_display: '2021',
                },
                {
                    key: 'transmission',
                    value: 'Automatic',
                    key_display: 'Transmission',
                    value_display: 'Automatic',
                },
                {
                    key: 'license_plate',
                    value: 'ABC1234',
                    key_display: 'License Plate',
                    value_display: 'ABC1234',
                },
                {
                    key: 'chassis_number',
                    value: 'JTMZK33V075012345',
                    key_display: 'Chassis Number',
                    value_display: 'JTMZK33V075012345',
                },
                {
                    key: 'engine_number',
                    value: '2ZR1234567',
                    key_display: 'Engine Number',
                    value_display: '2ZR1234567',
                },
                {
                    key: 'color',
                    value: 'Metallic Silver',
                    key_display: 'Color',
                    value_display: 'Metallic Silver',
                },
                {
                    key: 'usage_type',
                    value: 'Private',
                    key_display: 'Usage Type',
                    value_display: 'Private',
                },
                {
                    key: 'annual_mileage',
                    value: '15000',
                    key_display: 'Annual Mileage',
                    value_display: '15,000 km',
                },
                {
                    key: 'parking_location',
                    value: 'Covered garage at home',
                    key_display: 'Parking Location',
                    value_display: 'Covered garage at home',
                },
                {
                    key: 'vehicle_modifications',
                    value: 'None',
                    key_display: 'Vehicle Modifications',
                    value_display: 'None',
                },
            ],
            declarations: {},
            ratingExchange: {},
            pricingBreakdown: {},
            policyCoverages: [],
            links: [
                {
                    rel: 'policy_versions',
                    href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/',
                },
                {
                    rel: 'policy_coverages',
                    href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policy-coverages/',
                },
                {
                    rel: 'policies',
                    href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/',
                },
            ],
            isRemoved: false,
            isRated: false,
            createdAt: '2025-10-20T12:20:19.520342+02:00',
            updatedAt: '2025-10-20T12:20:19.520359+02:00',
        },
    ],
    headers: [
        {
            key: 'source',
            value: 'CCI',
            key_display: 'Source',
            value_display: 'CCI',
        },
    ],
    attributes: [
        {
            key: 'deductible_amount',
            value: 5000,
            key_display: 'Deductible Amount',
            value_display: '฿5,000',
        },
        {
            key: 'flood_coverage',
            value: 800,
            key_display: 'Flood Coverage',
            value_display: '+฿800/year',
        },
        {
            key: 'fire_protection',
            value: 600,
            key_display: 'Fire Protection',
            value_display: '+฿600/year',
        },
        {
            key: 'theft_coverage',
            value: 1200,
            key_display: 'Theft Coverage',
            value_display: '+฿1,200/year',
        },
        {
            key: 'personal_accident_driver',
            value: 500,
            key_display: 'Personal Accident for Driver',
            value_display: '+฿500/year',
        },
        {
            key: 'passenger_protection',
            value: 600,
            key_display: 'Passenger Protection',
            value_display: '+฿600/year',
        },
        {
            key: 'windshield_protection',
            value: 400,
            key_display: 'Windshield Protection',
            value_display: '+฿400/year',
        },
    ],
    declarations: {},
    lostStatusReason: null,
    otherLostStatusReasons: null,
    leadType: 'Drop Off',
    leadTypeReason: null,
    leadClassification: 'Hot',
    policy: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/76513363-037c-4611-9469-4456448b11c1/',
        id: '76513363-037c-4611-9469-4456448b11c1',
    },
    transactionType: 'New Business',
    transactions: [],
    latestVersion: null,
    currentVersion: null,
    rootVersion: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/efa43fe2-05bb-4957-a40e-b9daafa3897e/',
        id: 'efa43fe2-05bb-4957-a40e-b9daafa3897e',
    },
    rating: {
        '2-plus': {
            yearly: {
                adminFee: 80,
                iptAmount: 0,
                netAmount: 7693,
                finalAmount: 7947,
                loadingAmount: 254,
                premiumAmount: 7947,
                totalPayableAmount: 8027,
            },
            monthly: {
                adminFee: 6.67,
                iptAmount: 0.0,
                netAmount: 641.08,
                finalAmount: 662.25,
                loadingAmount: 21.17,
                premiumAmount: 662.25,
                totalPayableAmount: 668.92,
            },
            coverage: {
                deductible: 3000,
                floodCoverage: true,
                theftProtection: false,
                ownDamageCoverage: null,
                thirdPartyLiability: 364290,
                authorizedRepairShop: true,
            },
        },
        '3-plus': {
            yearly: {
                adminFee: 120,
                iptAmount: 0,
                netAmount: 8282,
                finalAmount: 8539,
                loadingAmount: 257,
                premiumAmount: 8539,
                totalPayableAmount: 8659,
            },
            monthly: {
                adminFee: 10.0,
                iptAmount: 0.0,
                netAmount: 690.17,
                finalAmount: 711.58,
                loadingAmount: 21.42,
                premiumAmount: 711.58,
                totalPayableAmount: 721.58,
            },
            coverage: {
                deductible: 3000,
                floodCoverage: true,
                theftProtection: false,
                ownDamageCoverage: 105473,
                thirdPartyLiability: 588293,
                authorizedRepairShop: true,
            },
        },
        comprehensive: {
            yearly: {
                adminFee: 240,
                iptAmount: 0,
                netAmount: 15000,
                finalAmount: 16660,
                loadingAmount: 1660,
                premiumAmount: 16660,
                totalPayableAmount: 16900,
            },
            monthly: {
                adminFee: 20.0,
                iptAmount: 0.0,
                netAmount: 1250.0,
                finalAmount: 1388.33,
                loadingAmount: 138.33,
                premiumAmount: 1388.33,
                totalPayableAmount: 1408.33,
            },
            coverage: {
                deductible: 0,
                floodCoverage: true,
                theftProtection: true,
                ownDamageCoverage: 600000,
                thirdPartyLiability: 1000000,
                authorizedRepairShop: true,
            },
        },
        'third-party-only': {
            yearly: {
                adminFee: 100,
                iptAmount: 0,
                netAmount: 4789,
                finalAmount: 5067,
                loadingAmount: 278,
                premiumAmount: 5067,
                totalPayableAmount: 5167,
            },
            monthly: {
                adminFee: 8.33,
                iptAmount: 0.0,
                netAmount: 399.08,
                finalAmount: 422.25,
                loadingAmount: 23.17,
                premiumAmount: 422.25,
                totalPayableAmount: 430.58,
            },
            coverage: {
                deductible: 3000,
                floodCoverage: true,
                theftProtection: true,
                ownDamageCoverage: null,
                thirdPartyLiability: 685820,
                authorizedRepairShop: true,
            },
        },
        'third-party-bodily-injury-and-death': {
            yearly: {
                adminFee: 60,
                iptAmount: 0,
                netAmount: 8382,
                finalAmount: 8859,
                loadingAmount: 477,
                premiumAmount: 8859,
                totalPayableAmount: 8919,
            },
            monthly: {
                adminFee: 5.0,
                iptAmount: 0.0,
                netAmount: 698.5,
                finalAmount: 738.25,
                loadingAmount: 39.75,
                premiumAmount: 738.25,
                totalPayableAmount: 743.25,
            },
            coverage: {
                deductible: 1000,
                floodCoverage: true,
                theftProtection: false,
                ownDamageCoverage: null,
                thirdPartyLiability: 881520,
                authorizedRepairShop: true,
            },
        },
    },
    pdfFileUrl: null,
    allowPdfGeneration: false,
    endorsementNote: null,
    fileAttachments: [],
    ratingTask: {},
    links: [
        {
            rel: 'policies',
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/',
        },
        {
            rel: 'policy_versions',
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/',
        },
        {
            rel: 'business_partners',
            href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/',
        },
    ],
    createdAt: '2025-10-20T12:20:19.276880+02:00',
    updatedAt: '2025-10-20T12:20:20.442086+02:00',
    contract: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/contracts/694a9327-32ee-44b6-9598-d0b40cc9bf5f/',
        id: '694a9327-32ee-44b6-9598-d0b40cc9bf5f',
    },
    extraData: null,
    mtaDates: [],
    excludeScheduleNewPolicyEmail: false,
    partnerVersionUuid: null,
    recurringPayableAmount: null,
};

export default function QuoteReview() {
    const { id } = useParams();
    const [, navigate] = useLocation();
    const [paymentPeriod, setPaymentPeriod] = useState<'yearly' | 'monthly'>('yearly');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isActivating, setIsActivating] = useState(false);
    const [isChangingPlan, setIsChangingPlan] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Fetch quote details from API
    const {
        data: quoteData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [`quote-${id}`],
        queryFn: async () => {
            const response = await apiRequest(
                'GET',
                `https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/${id}/?expand=product_plan,holder.addresses,items`
            );

            const data = await response.json();
            console.log(data);
            return data;
        },
        enabled: !!id, // Only run query if id exists
    });

    // Prepopulate selectedPlan when quote data is loaded
    useEffect(() => {
        if (quoteData?.productPlan?.slug) {
            setSelectedPlan(quoteData.productPlan.slug);
        }
    }, [quoteData]);

    const handleBackToHome = () => {
        navigate('/');
    };

    const handlePlanChange = async (planType: string) => {
        // Don't do anything if selecting the same plan
        if (planType === selectedPlan) return;

        setIsChangingPlan(true);

        try {
            // Generate payload with the new plan
            const payload = parsePayload(quoteData, planType);

            // Make PUT API call to update the quote
            const response = await apiRequest(
                'PUT',
                'https://sandbox-bo.i2go.io/api/v3/embedded-service/quotes/',
                payload
            );

            const updatedQuote = await response.json();
            console.log('Updated quote:', updatedQuote);

            // Update the selected plan
            setSelectedPlan(planType);
        } catch (error) {
            console.error('Error updating plan:', error);
            // Optionally show an error message to the user
        } finally {
            setIsChangingPlan(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header showCta={false} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-16 h-16 text-accent animate-spin mb-4" />
                            <h2 className="text-xl font-semibold text-primary mb-2">Loading Quote Details...</h2>
                            <p className="text-muted-foreground">Please wait while we fetch your quote information</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <Header showCta={false} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Error Loading Quote</h1>
                            <p className="text-muted-foreground">
                                {error instanceof Error ? error.message : 'Failed to load quote details'}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={handleBackToHome}>Back to Home</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Transform rating data into quote cards
    const getQuoteCards = () => {
        if (!quoteData?.rating) return [];

        const ratingKeys = Object.keys(quoteData.rating);
        return ratingKeys.map((key) => {
            const ratingData = (quoteData.rating as any)[key];
            const yearlyData = ratingData.yearly;
            const monthlyData = ratingData.monthly;

            // Map coverage type to display names and icons
            const typeMapping: { [key: string]: { title: string; subtitle: string; Icon: any } } = {
                comprehensive: { title: 'Type 1', subtitle: 'Comprehensive Insurance', Icon: ShieldCheck },
                '2-plus': { title: 'Type 2+', subtitle: 'Enhanced Coverage', Icon: Shield },
                '3-plus': { title: 'Type 3+', subtitle: 'Premium Third Party', Icon: Shield },
                'third-party-only': { title: 'Third Party', subtitle: 'Basic Coverage', Icon: Car },
                'third-party-bodily-injury-and-death': {
                    title: 'Third Party Plus',
                    subtitle: 'Bodily Injury & Death',
                    Icon: Shield,
                },
            };

            const displayInfo = typeMapping[key] || { title: key, subtitle: 'Insurance Coverage', Icon: Shield };

            // Build features based on coverage details
            const coverage = ratingData.coverage || {};
            const features = [
                {
                    text: coverage.ownDamageCoverage
                        ? `Own damage up to ฿${coverage.ownDamageCoverage?.toLocaleString()}`
                        : 'No own damage coverage',
                    available: !!coverage.ownDamageCoverage,
                },
                {
                    text: `Third-party liability ฿${coverage.thirdPartyLiability?.toLocaleString() || '0'}`,
                    available: !!coverage.thirdPartyLiability,
                },
                {
                    text: coverage.floodCoverage ? 'Flood coverage included' : 'No flood coverage',
                    available: coverage.floodCoverage || false,
                },
                {
                    text: coverage.theftProtection ? 'Theft protection included' : 'No theft protection',
                    available: coverage.theftProtection || false,
                },
                {
                    text: coverage.authorizedRepairShop ? 'Authorized repair shop' : 'Any repair shop',
                    available: coverage.authorizedRepairShop || false,
                },
                {
                    text: `Deductible: ฿${coverage.deductible?.toLocaleString() || '0'}`,
                    available: true,
                },
            ];

            return {
                type: key,
                title: displayInfo.title,
                subtitle: displayInfo.subtitle,
                Icon: displayInfo.Icon,
                price: yearlyData.totalPayableAmount,
                monthlyPrice: Math.round(monthlyData.totalPayableAmount),
                recommended: key === 'comprehensive',
                features,
            };
        });
    };

    const quoteCards = getQuoteCards();

    return (
        <div className="min-h-screen bg-background">
            <Header showCta={false} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header Section */}
                <div className="px-6 sm:px-8 py-8 mb-8">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                            Quote Generated Successfully!
                        </h1>
                        <p className="text-lg text-muted-foreground">Your insurance quote is ready for review</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Quote Number</div>
                            <div className="font-semibold text-foreground text-sm">{quoteData?.number || id}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Status</div>
                            <div className="font-semibold text-foreground">{quoteData?.status || 'Pending'}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Policy Term</div>
                            <div className="font-semibold text-foreground">{quoteData?.policyTerm || 'Yearly'}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Coverage Period</div>
                            <div className="font-semibold text-foreground text-sm">
                                {quoteData?.startDate} to {quoteData?.endDate}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Period Toggle */}
                <div className="px-6 sm:px-8 py-6 mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm text-foreground font-medium">Payment:</span>
                        <div className="inline-flex rounded-lg border border-border p-1 bg-white">
                            <Button
                                variant={paymentPeriod === 'yearly' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setPaymentPeriod('yearly')}
                            >
                                Yearly
                            </Button>
                            <Button
                                variant={paymentPeriod === 'monthly' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setPaymentPeriod('monthly')}
                            >
                                Monthly
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quote Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {quoteCards.map((coverage) => {
                        const displayPrice = paymentPeriod === 'yearly' ? coverage.price : coverage.monthlyPrice;
                        const period = paymentPeriod === 'yearly' ? '/year' : '/month';

                        const isSelected = selectedPlan === coverage.type;

                        return (
                            <Card
                                key={coverage.type}
                                className={`${
                                    isSelected
                                        ? 'border-2 border-accent shadow-xl'
                                        : coverage.recommended
                                        ? 'border-2 border-primary shadow-lg'
                                        : 'border border-border'
                                } hover:shadow-xl transition-all cursor-pointer group bg-white`}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <coverage.Icon className="w-8 h-8 text-accent" />
                                        <div className="flex flex-col items-end gap-2">
                                            {coverage.recommended && (
                                                <span className="relative px-3 py-1.5 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white text-xs font-semibold rounded-full shadow-lg overflow-hidden before:absolute before:inset-0 before:rounded-full before:p-[1.5px] before:bg-gradient-to-r before:from-yellow-400 before:via-amber-400 before:to-yellow-500 before:-z-10">
                                                    <span className="relative z-10">Recommended</span>
                                                </span>
                                            )}
                                            {isSelected && (
                                                <span className="px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded-full">
                                                    Current Plan
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-primary mb-2">{coverage.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{coverage.subtitle}</p>
                                </CardHeader>

                                <CardContent className="pt-6">
                                    <div className="space-y-3 mb-6">
                                        {coverage.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start space-x-2 text-sm">
                                                <i
                                                    className={`fas ${
                                                        feature.available
                                                            ? 'fa-check-circle text-accent'
                                                            : 'fa-times-circle text-muted-foreground/50'
                                                    } mt-0.5`}
                                                ></i>
                                                <span
                                                    className={
                                                        feature.available
                                                            ? 'text-foreground'
                                                            : 'text-muted-foreground line-through'
                                                    }
                                                >
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="text-sm text-muted-foreground mb-2">Starting from</div>
                                        <div className="flex items-end mb-4">
                                            <span className="text-3xl font-bold text-primary">
                                                ฿{displayPrice.toLocaleString()}
                                            </span>
                                            <span className="text-muted-foreground ml-2 mb-1">{period}</span>
                                        </div>
                                        {paymentPeriod === 'yearly' && (
                                            <div className="text-sm text-muted-foreground">
                                                or ฿{coverage.monthlyPrice.toLocaleString()}/month
                                            </div>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        onClick={() => handlePlanChange(coverage.type)}
                                        variant={isSelected ? 'default' : 'outline'}
                                        className="w-full"
                                        disabled={isSelected}
                                    >
                                        {isSelected ? 'Selected' : 'Select Plan'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Additional Coverage Details */}
                {/* {quoteData?.attributes && quoteData.attributes.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-border p-6 mb-8">
                        <h2 className="text-xl font-bold text-primary mb-4">Additional Coverage Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quoteData.attributes.map((attr: any, idx: number) => (
                                <div key={idx} className="bg-background rounded-lg p-4 border border-border">
                                    <div className="text-sm font-medium text-muted-foreground mb-1">{attr.key_display}</div>
                                    <div className="text-lg font-semibold text-foreground">{attr.value_display}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* Important Note */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start space-x-3">
                        <i className="fas fa-info-circle text-amber-600 text-xl mt-0.5"></i>
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-1">Important Note</h4>
                            <p className="text-sm text-amber-800">
                                Prices shown are estimates based on the information provided. Actual prices may vary
                                based on additional conditions. Please contact our team for an accurate quote.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-border px-4 sm:px-6 lg:px-8 py-4 -mx-4 sm:-mx-6 lg:-mx-8 mt-8 z-10">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" onClick={handleBackToHome} className="flex-1">
                            Back to Home
                        </Button>
                        <Button className="flex-1" onClick={() => setShowConfirmDialog(true)}>
                            <i className="fas fa-check-circle mr-2"></i>
                            Activate Quote
                        </Button>
                    </div>
                </div>

                {/* Confirmation Dialog */}
                <Dialog
                    open={showConfirmDialog}
                    onOpenChange={(open) => {
                        if (!isActivating) {
                            setShowConfirmDialog(open);
                        }
                    }}
                >
                    <DialogContent className="max-w-2xl">
                        {isActivating ? (
                            // Loading State
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-primary">
                                        Activating Your Policy
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="py-12">
                                    <div className="flex flex-col items-center justify-center space-y-6">
                                        <Loader2 className="w-16 h-16 text-accent animate-spin" />
                                        <div className="text-center space-y-2">
                                            <h3 className="text-xl font-semibold text-foreground">
                                                Please wait while we activate your policy
                                            </h3>
                                            <p className="text-muted-foreground">This may take a few moments...</p>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full max-w-md">
                                            <div className="flex items-start space-x-3">
                                                <i className="fas fa-exclamation-circle text-amber-600 mt-0.5"></i>
                                                <div className="text-sm text-amber-800">
                                                    <p className="font-semibold mb-1">Please do not close this page</p>
                                                    <p>
                                                        We're processing your policy activation. Closing this page may
                                                        interrupt the process.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Confirmation State
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-primary">
                                        Confirm Quote Activation
                                    </DialogTitle>
                                    <DialogDescription className="text-base">
                                        Please review your quote details before activating
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4 py-4">
                                    {/* Quote Summary */}
                                    <div className="bg-background rounded-lg p-4 border border-border">
                                        <h3 className="font-semibold text-foreground mb-3">Quote Summary</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Quote Number:</span>
                                                <p className="font-medium text-foreground">{quoteData?.number}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Status:</span>
                                                <p className="font-medium text-foreground">{quoteData?.status}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Policy Term:</span>
                                                <p className="font-medium text-foreground">{quoteData?.policyTerm}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Payment Scheme:</span>
                                                <p className="font-medium text-foreground">
                                                    {quoteData?.paymentScheme}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coverage Period */}
                                    <div className="bg-background rounded-lg p-4 border border-border">
                                        <h3 className="font-semibold text-foreground mb-3">Coverage Period</h3>
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">From:</span>
                                            <p className="font-medium text-foreground mb-2">{quoteData?.startDate}</p>
                                            <span className="text-muted-foreground">To:</span>
                                            <p className="font-medium text-foreground">{quoteData?.endDate}</p>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                                        <h3 className="font-semibold text-foreground mb-3">Total Amount</h3>
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <p className="text-3xl font-bold text-primary">
                                                    ฿{Number(quoteData?.totalPayableAmount || 0).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {paymentPeriod === 'yearly' ? 'Per Year' : 'Per Month'}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm">
                                                <p className="text-muted-foreground">Net Amount</p>
                                                <p className="font-semibold">
                                                    ฿{Number(quoteData?.netAmount || 0).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms Agreement */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <div className="flex items-start space-x-2">
                                            <i className="fas fa-exclamation-triangle text-amber-600 mt-0.5"></i>
                                            <div className="text-sm text-amber-800">
                                                <p className="font-semibold mb-1">Important</p>
                                                <p>
                                                    By activating this quote, you agree to proceed with the insurance
                                                    policy based on the terms and conditions outlined. This action will
                                                    initiate the policy activation process.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowConfirmDialog(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={() => {
                                            setIsActivating(true);

                                            // Simulate 5 second activation process
                                            setTimeout(() => {
                                                console.log('Quote activated:', quoteData?.number);
                                                setIsActivating(false);
                                                setShowConfirmDialog(false);
                                                // Redirect to policy issuance page
                                                navigate(`/your-policy/${id}`);
                                            }, 5000);
                                        }}
                                    >
                                        <i className="fas fa-check-circle mr-2"></i>
                                        Confirm Activation
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Plan Change Loading Overlay */}
                {isChangingPlan && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl shadow-2xl border border-border p-8 max-w-md mx-4">
                            <div className="flex flex-col items-center justify-center">
                                <Loader2 className="w-16 h-16 text-accent animate-spin mb-4" />
                                <h2 className="text-xl font-semibold text-primary mb-2">Updating Your Plan...</h2>
                                <p className="text-muted-foreground text-center">
                                    Please wait while we update your coverage selection
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
