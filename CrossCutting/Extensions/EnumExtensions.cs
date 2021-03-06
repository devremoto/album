using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace CrossCutting.Extensions
{
    public static class EnumExtensions
    {

        public static List<string> ToStringList<T>(this Enum source)
        {
            if (source == null)
                return default;

            return Enum.GetNames(typeof(T)).ToList();
        }

        public static List<int> ToIntList<T>(this Enum source)
        {
            if (source == null)
                return default;

            List<int> result = new();
            foreach (var item in Enum.GetValues(typeof(T)))
            {
                result.Add((int)item);
            }

            return result;
        }

        public static List<object> ToObjectList(this Enum source)
        {
            List<object> list = new();
            foreach (var item in Enum.GetValues(source?.GetType()))
            {
                var objItem = new { Id = (int)item, Name = item.ToString().ToUpper(CultureInfo.InvariantCulture) };
                list.Add(objItem);
            }

            return list;
        }

        public static Dictionary<int, string> ToDictionary(this Enum source)
        {
            Dictionary<int, string> result = new();
            foreach (var item in Enum.GetValues(source?.GetType()))
            {
                result.Add((int)item, item.ToString());
            }

            return result;
        }

        public static T ToEnumValue<T>(this string source) where T : Enum
        {
            var result = Enum.Parse(typeof(T), source);
            return (T)result;
        }
    }
}
