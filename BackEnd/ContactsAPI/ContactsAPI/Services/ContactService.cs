using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using Memory.Data;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactsContext _context;

        public ContactService(ContactsContext context)
        {
            _context = context;
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<Contact> GetContactById(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<dynamic> GetContactList(int page, int pageSize)
        {
            var paginatedContacts = await _context.Contacts
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return new
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = _context.Contacts.Count(),
                TotalPages = (int)Math.Ceiling((double)_context.Contacts.Count() / pageSize),
                Data = paginatedContacts
            };
        }

        public async Task<bool> UpdateContact(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(contact.Id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<bool> DeleteContactById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
